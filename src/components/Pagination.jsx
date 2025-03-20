import React from "react";
export default function Pagination({setPagFilter, pagFilter, seachData}) {
  let pagFilterArray = Array.from(
    { length: Math.trunc(seachData.length / 10) },
    (_, index) => index + 1
  );

  const handlePagination = (e) => {
    setPagFilter(+e.target.textContent)
  }

  const generatePaginationItems = () => {
    const items = []
    if(pagFilter > 2) items.push(1, '...')
    pagFilterArray.forEach(el => {
      if(el > pagFilter - 3 && el < pagFilter+3 ) {
        if(!items.includes(el) && el != pagFilterArray.length)
          items.push(el)
      }
    })
    if(pagFilter < pagFilterArray.length)  items.push('...', pagFilterArray.length)
    else if(pagFilter === pagFilterArray.length)items.push(pagFilterArray.length)
    return items
  }

  const paginationItems = generatePaginationItems()

  return (
    <div>
      <div className="pag">
        <ul>
          {paginationItems.map((el,index) => (
            <li key={index}>
              <div className="pag-item">
              {el === '...' ? (<span> {el} </span>) : (
                <span onClick={handlePagination}>{el}</span>
              ) }
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
