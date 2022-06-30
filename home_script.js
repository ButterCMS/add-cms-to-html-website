// NOTE: Replace the `YOUR_BUTTERCMS_READ_KEY` value with your READ API Key from ButterCMS
const BUTTERCMS_READ_KEY = 'YOUR_BUTTERCMS_READ_KEY'

window.onload = async () => {
  const ulElement = document.getElementById("posted-antiques")
  const amountOfAntiques = document.getElementById("antiques-count")
  amountOfAntiques.innerText = `Loading antiques for sale...`

  const req = await fetch(`https://api.buttercms.com/v2/content/buttercms-antique-store?auth_token=${BUTTERCMS_READ_KEY}`)
  const { data } = await req.json();
  const antiques = data['buttercms-antique-store']

  amountOfAntiques.innerText = `${antiques.length} antiques available for sale`

  if (antiques.length < 1) {
    ulElement.innerHTML = `
            <li class="h-full w-full flex justify-center items-center" >
                <p class="text-center"> No antiques have been approved for sale yet! </p>
            </li>
        `
    return
  }

  antiques.map(({
    description,
    discovery_date,
    name,
    original_creation_date,
    posted_by,
    contact_phone_number,
    poster_location,
    sell_price
  }) => (
    ulElement.innerHTML += `
          <div class="mb-7 flex">
            <div class="shadow-xl bg-white rounded-lg w-96 flex flex-col justify-between leading-normal">
              <div class="p-3 flex justify-between" >
                <div>
                  <p class="text-gray-900 font-bold text-xl mb-2">${name}</p>
                  <p class="mt-1 text-gray-700 text-base">Posted by <span class="font-semibold" > ${posted_by} <span> </p>
                </div>

                <div>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${sell_price}</span>
                </div>
              </div>
              <hr />

              <div class="my-4 p-2" >
                <p class="text-gray-900 mb-4 leading-none">${description}</p>

                <div class="flex flex-col" >
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${poster_location}</span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${contact_phone_number}</span>
                </div>
              </div>

              <hr /> 
              <div class="mt-2 p-3" >
                <p class="text-gray-600" style="text-transform: capitalize;" > <span class="font-semibold" > Time created: </span>  ${new Date(original_creation_date).toDateString()}</p>
                <p class="text-gray-600" style="text-transform: capitalize;" > <span class="font-semibold" > Time discovered: </span>  ${new Date(discovery_date).toDateString()}</p>
              </div>
            </div>
        </div>
       `
  ))
}