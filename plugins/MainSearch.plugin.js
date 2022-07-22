let countContainer = document.querySelector(".search__findings")
let errorContainer = document.querySelector(".search__error")
let resultsContainer = document.getElementById("resultsContainer")
let output = document.getElementById("output")
// Ошибка при выполнении поиска
const renderError = () => {
  errorContainer.innerHTML = `
      <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
      <p class="search__error-message">
      Произошла ошибка...
      </p>
      `
  countContainer.innerHTML = ""
}
// Ничего не найдено по поисковому запросу
const renderEmptyResults = () => {
  errorContainer.innerHTML = `
          <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
          <p class="search__error-message">
          По вашему запросу ничего не найдено, попробуйте уточнить запрос
          </p>
    `
  countContainer.innerHTML = ""
}
// Счётчик найденных результатов
const renderCount = (count) => {
  countContainer.innerHTML = `
        Найдено <span class="search__findings-amount">${count.toLocaleString(
          "ru-RU"
        )}</span> результатов
    `
}
// Предзагрузка результатов
const onSubmitStart = () => {
  countContainer.innerHTML = `Загрузка...`
  resultsContainer.innerHTML = ""
  errorContainer.innerHTML = ""
}
// Оформление полученного результата
function template(item) {
  const newElement = document.createElement("div")
  newElement.classList.add("search__finding-item")
  newElement.innerHTML = `
        <hr className="my-5 border-gray-100" />
        <div className="flex px-4 mt-5 gap-x-4">
                <div>
                  <svg
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={32} height={32} rx={4} fill="#E0E7FF" />
                    <path
                      d="M21.3438 10.375H15.8632C15.6968 10.3755 15.5339 10.3266 15.3953 10.2344L14.418 9.58082C14.0943 9.36441 13.7136 9.24924 13.3243 9.25H10.6562C10.1343 9.25056 9.63384 9.45816 9.26475 9.82725C8.89566 10.1963 8.68806 10.6968 8.6875 11.2188V12.0625H23.3125C23.3125 10.9769 22.4294 10.375 21.3438 10.375Z"
                      fill="#4338CA"
                    />
                    <path
                      d="M21.8975 22.75H10.1026C9.58602 22.7494 9.09036 22.5458 8.72253 22.1831C8.35469 21.8204 8.14415 21.3277 8.13631 20.8111L7.56889 15.0195V15.0096C7.55031 14.7775 7.57997 14.5441 7.65602 14.3239C7.73206 14.1038 7.85284 13.9019 8.01075 13.7307C8.16866 13.5595 8.36029 13.4229 8.57358 13.3294C8.78686 13.236 9.01719 13.1876 9.25006 13.1875H22.7536C22.9864 13.1877 23.2166 13.2361 23.4298 13.3297C23.643 13.4232 23.8346 13.5598 23.9924 13.731C24.1503 13.9021 24.271 14.1041 24.347 14.3241C24.423 14.5442 24.4526 14.7776 24.434 15.0096V15.0195L23.8638 20.8111C23.856 21.3277 23.6454 21.8204 23.2776 22.1831C22.9098 22.5458 22.4141 22.7494 21.8975 22.75Z"
                      fill="#4338CA"
                    />
                  </svg>
                </div>
                <div className>
                  <p className="text-sm font-medium leading-none text-gray-800 mb-[4px]">
                    <a href="${item.html_url}" target="_blank">
                        ${item.full_name}
                    </a>
                  </p>
                  <p className="text-xs leading-3 text-gray-600">
                    ${item.description}
                  </p>
                </div>
              </div>
      `
  return newElement
}
// Адрес API GitHub
const apiUrl = "https://api.nomoreparties.co/github-search"
// Функция по работе с API
async function onSubmit(event) {
  event.preventDefault()

  const formData = new FormData()
  const inputValue = formData.get("title")

  const query = new URLSearchParams()
  query.append("q", inputValue)

  const targetUrl = `${apiUrl}?${query.toString()}`

  onSubmitStart()

  try {
    const result = await fetch(targetUrl)
    const resultJson = await result.json()

    if (resultJson.total_count == 0) {
      renderEmptyResults()
      return
    }

    renderCount(resultJson.total_count)
    resultJson.items.forEach((item) =>
      resultsContainer.appendChild(template(item))
    )
  } catch (e) {
    renderError()
  }
}

function peopleShow_search_2() {
  document.getElementById("hidee_search_2").style.display = "none"
  document.getElementById("people_search_2").style.display = "block"
  document.getElementById("people2_search_2").style.display = "none"
}
function peopleShow2_search_2() {
  document.getElementById("hidee_search_2").style.display = "none"
  document.getElementById("people_search_2").style.display = "none"
  document.getElementById("people2_search_2").style.display = "block"
}
function Shows_search_2() {
  document.getElementById("hidee_search_2").style.display = "block"
  document.getElementById("people_search_2").style.display = "none"
  document.getElementById("people2_search_2").style.display = "none"
}
//   output.addEventListener("keydown", (evt) => {
//     if (evt.which === 13) {
//       evt.preventDefault()
//       onSubmit()
//     }
//   })
function eraseText_search_2() {
  output.value = ""
}
