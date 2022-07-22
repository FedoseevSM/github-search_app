import { useEffect } from "react"

const MainSearch = () => {
  useEffect(() => {})
  // Ошибка при выполнении поиска
  function renderError() {
    const resultsContainer = document.getElementById("resultsContainer")
    const countContainer = document.querySelector(".search__findings")
    const errorContainer = document.querySelector(".search__error")
    errorContainer.innerHTML = `
      <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
      <p class="search__error-message">
      Произошла ошибка...
      </p>
      `
    countContainer.innerHTML = ""
  }

  // Ничего не найдено по поисковому запросу
  function renderEmptyResults() {
    const countContainer = document.querySelector(".search__findings")
    const errorContainer = document.querySelector(".search__error")
    errorContainer.innerHTML = `
          <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
          <p class="search__error-message">
          По вашему запросу ничего не найдено, попробуйте уточнить запрос
          </p>
    `
    countContainer.innerHTML = ""
  }
  // Счётчик найденных результатов
  function renderCount(count) {
    document.getElementById("searchFindings").innerHTML = `
        Найдено <span class="search__findings-amount">${count.toLocaleString(
          "ru-RU"
        )}</span> результатов
    `
  }
  // Предзагрузка результатов
  function onSubmitStart() {
    document.getElementById("searchFindings").innerHTML = `Загрузка...`
    document.getElementById("resultsContainer").innerHTML = ""
    document.querySelector(".search__error").innerHTML = ""
  }
  // Оформление полученного результата
  function template(item) {
    const newElement = document.createElement("div")
    newElement.classList.add("search__finding-item")
    newElement.innerHTML = `
        <hr class="my-5 border-gray-100" />
        <div class="flex  px-4 mt-5 gap-x-4">
                <div>
                  <svg
                    width=32
                    height=32
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width=32 height=32 rx=4 fill="#E0E7FF" />
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
                <div>
                  <p class="text-sm font-medium leading-none text-gray-800 mb-[4px]">
                    <a href="${item.html_url}" target="_blank">
                        ${item.full_name}
                    </a>
                  </p>
                  <p class="text-xs leading-3 text-gray-600">
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
  async function onSubmit() {
    const resultsContainer = document.getElementById("resultsContainer")

    // event.preventDefault()
    const form = document.getElementById("output")
    const inputValue = form.value

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
  function outputClick() {
    document.getElementById("output").addEventListener("keydown", (evt) => {
      if (evt.which === 13) {
        evt.preventDefault()
        onSubmit()
      }
    })
  }
  function eraseText_search_2() {
    output.value = ""
  }
  return (
    <>
      <div>
        <div className="px-4 py-12">
          <div className="lg:max-w-[452px]  w-full mx-auto bg-white pb-5 rounded">
            <div className="mt-2">
              <div className="mb-4 border rounded relative">
                <svg
                  className="absolute z-20 cursor-pointer top-[18px] left-4"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  onClick={onSubmit}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2716 13.1684L11.3313 10.2281C12.0391 9.28574 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28574 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.268 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96Z"
                    fill="#4B5563"
                  />
                </svg>
                <p
                  onClick={eraseText_search_2}
                  className="absolute z-20 text-xs font-medium leading-3 text-gray-600 underline right-4 top-[18px] cursor-pointer"
                >
                  Очистить
                </p>
                <input
                  id="output"
                  className="relative text-sm leading-none text-gray-600 bg-white rounded lg:max-w-[452px] w-full px-10 py-4 outline-none"
                  type="text"
                  name="title"
                  onClick={outputClick}
                  placeholder="Название репозитория"
                />
              </div>
              {/* tabs */}
              <ul className="hidden flex flex-wrap items-center pb-4 text-gray-600 border-b border-gray-100 lg:gap-x-6 gap-x-2">
                <div className="flex alertBtn group " onClick={Shows_search_2}>
                  <li className="text-xs px-3 py-2 ml-[5px] font-medium text-gray-600 transition duration-200 rounded cursor-pointer alertBtn group-hover:text-indigo-700 ">
                    All
                  </li>
                  <p className="text-xs font-medium leading-3 text-gray-600 px-1 py-0.5 bg-gray-50 rounded w-3.5 h-full mt-2 group-hover:bg-indigo-50 group-hover:text-indigo-700">
                    9
                  </p>
                </div>
                <div
                  className="flex updateBtn group"
                  onClick={peopleShow_search_2}
                >
                  <svg
                    className="mt-[10px] cursor-pointer text-[#4B5563] group-hover:text-indigo-700"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.40621 3.9375C9.29902 5.38316 8.20309 6.5625 6.99996 6.5625C5.79684 6.5625 4.69898 5.38344 4.59371 3.9375C4.48434 2.43359 5.55074 1.3125 6.99996 1.3125C8.44918 1.3125 9.51559 2.46094 9.40621 3.9375Z"
                      stroke="Currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 8.3125C4.6211 8.3125 2.20665 9.625 1.75985 12.1023C1.70598 12.4009 1.87497 12.6875 2.18751 12.6875H11.8125C12.1253 12.6875 12.2943 12.4009 12.2404 12.1023C11.7934 9.625 9.37891 8.3125 7 8.3125Z"
                      stroke="Currentcolor"
                      strokeMiterlimit={10}
                    />
                  </svg>
                  <li className="text-xs px-3 py-2 ml-[5px] font-medium text-gray-600 transition duration-200 rounded cursor-pointer updateBtn group-hover:text-indigo-700 ">
                    People
                  </li>
                  <p className="text-xs font-medium leading-3 text-gray-600 px-1 py-0.5 bg-gray-50 rounded  h-full mt-2 group-hover:bg-indigo-50 group-hover:text-indigo-700">
                    4
                  </p>
                </div>
                <div
                  className="flex logBtn group"
                  onClick={peopleShow2_search_2}
                >
                  <svg
                    className="mt-[10px] text-[#4B5563] group-hover:text-indigo-700 cursor-pointer"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.375 6.0498V11.375C11.375 11.7231 11.2367 12.0569 10.9906 12.3031C10.7444 12.5492 10.4106 12.6875 10.0625 12.6875H3.9375C3.5894 12.6875 3.25556 12.5492 3.00942 12.3031C2.76328 12.0569 2.625 11.7231 2.625 11.375V2.625C2.625 2.2769 2.76328 1.94306 3.00942 1.69692C3.25556 1.45078 3.5894 1.3125 3.9375 1.3125H6.6377C6.86968 1.31254 7.09215 1.40469 7.25621 1.56871L11.1188 5.43129C11.2828 5.59535 11.375 5.81782 11.375 6.0498Z"
                      stroke="#4B5563"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 1.53125V4.8125C7 5.04456 7.09219 5.26712 7.25628 5.43122C7.42038 5.59531 7.64294 5.6875 7.875 5.6875H11.1562"
                      stroke="Currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.8125 7.875H9.1875"
                      stroke="Currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.8125 10.0625H9.1875"
                      stroke="Currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <li className="px-3 py-2 text-xs font-medium text-gray-600 transition duration-200 rounded cursor-pointer logBtn group-hover:text-indigo-700 ">
                    Files
                  </li>
                  <p className="text-xs font-medium leading-3 text-gray-600 px-1 py-0.5 bg-gray-50 rounded w-3.5 h-full mt-2 group-hover:bg-indigo-50 group-hover:text-indigo-700">
                    3
                  </p>
                </div>
                <div className="flex ml-4 group lg:ml-0 md:ml-0">
                  <svg
                    className="mt-[10px] cursor-pointer text-gray-600 group-hover:text-indigo-700"
                    width={15}
                    height={15}
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="Currentcolor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.90846 5.25V9.1834C5.913 9.47102 6.03045 9.74533 6.23546 9.94713C6.44047 10.1489 6.7166 10.262 7.00426 10.262C7.29192 10.262 7.56805 10.1489 7.77306 9.94713C7.97807 9.74533 8.09552 9.47102 8.10006 9.1834L8.10361 4.02773C8.1066 3.78189 8.06075 3.53791 7.96874 3.30992C7.87672 3.08193 7.74037 2.87447 7.56758 2.69957C7.39479 2.52467 7.189 2.38581 6.96214 2.29104C6.73529 2.19626 6.49187 2.14746 6.24602 2.14746C6.00016 2.14746 5.75675 2.19626 5.52989 2.29104C5.30303 2.38581 5.09725 2.52467 4.92446 2.69957C4.75167 2.87447 4.61531 3.08193 4.5233 3.30992C4.43128 3.53791 4.38544 3.78189 4.38842 4.02773V9.21812C4.38341 9.56423 4.44725 9.90788 4.57624 10.2291C4.70522 10.5503 4.89677 10.8427 5.13975 11.0892C5.38273 11.3357 5.6723 11.5315 5.99161 11.6651C6.31092 11.7987 6.65361 11.8675 6.99975 11.8675C7.34589 11.8675 7.68857 11.7987 8.00789 11.6651C8.3272 11.5315 8.61676 11.3357 8.85974 11.0892C9.10272 10.8427 9.29427 10.5503 9.42326 10.2291C9.55224 9.90788 9.61608 9.56423 9.61107 9.21812V4.36789"
                      stroke="Currentcolor"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                    />
                  </svg>
                  <li className="px-3 py-2 text-xs font-medium text-gray-600 transition duration-200 rounded cursor-pointer alertBtn group-hover:text-indigo-700 ">
                    Tasks
                  </li>
                  <p className="text-xs font-medium leading-3 text-gray-600 px-1 py-0.5 bg-gray-50 rounded w-3.5 h-full mt-2 group-hover:text-indigo-700 group-hover:bg-indigo-50">
                    2
                  </p>
                </div>
              </ul>
              {/* end */}
            </div>
            <div className="search__result">
              <h2 id="searchFindings"></h2>
              <div
                aria-label="people-task-file1"
                className="block"
                id="hidee_search_2"
              >
                <section id="resultsContainer"></section>
              </div>
              <div className="search__error"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainSearch
