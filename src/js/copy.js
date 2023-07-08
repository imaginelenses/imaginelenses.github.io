// Click to copy button

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre').forEach((e) => {
    e.addEventListener('click', () => {
      let data = e.firstElementChild.textContent
      if (window.isSecureContext) {
        window.navigator.clipboard.writeText(data)
      }
      else {
        console.log(data)
      }
      e.setAttribute('data-copied', true)
      window.setTimeout(() => e.removeAttribute('data-copied'), 1000)
    })
  })
})