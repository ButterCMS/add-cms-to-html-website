// NOTE: Replace the `BUTTERCMS_WRITE_KEY` value with your WRITE API Key from ButterCMS
const BUTTERCMS_WRITE_KEY = 'BUTTERCMS_WRITE_KEY'
const postAntiqueCollectionBtn = document.getElementById('saveAntiqueBtn');

postAntiqueCollectionBtn.addEventListener('click', async function (event) {
  event.preventDefault()

  const name = document.querySelector('#antique-name').value
  const description = document.querySelector('#antique-description').value
  const posted_by = document.querySelector('#poster-name').value
  const poster_location = document.querySelector('#poster-location').value
  const contact_phone_number = document.querySelector('#contact_phone_number').value

  const original_creation_date = document.querySelector('#original_creation_date').value
  const discovery_date = document.querySelector('#discovery_date').value
  const sell_price = document.querySelector('#sell-price').value

  try {
    const writeReq = await fetch(`https://api.buttercms.com/v2/content/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${BUTTERCMS_WRITE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: "buttercms-antique-store",
        status: 'draft',
        fields: [
          {
            name,
            contact_phone_number,
            description,
            posted_by,
            sell_price,
            poster_location,
            original_creation_date,
            discovery_date,
          }
        ],
      })
    })

    const data = await writeReq.json()

    if (data?.status === 'pending') {
        window.location.href = '/';
    }

  } catch (e) {
    console.log(e)
  }
})