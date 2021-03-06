import React, { useState, useEffect } from 'react'

const CategoryData = (props) => {
  const [state, setState] = useState({
    data: [],
    count: 0,
  })

  // componentDidUpdate() {
  //     this.updateComp()
  // }

  useEffect(() => {
    console.log('componentDidMount called')
    if (state.count < 10) {
      let url = `https://api.covidfyi.in/v1/state/${props.state}/${props.category}`

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setState({
            data: data.results,
            count: state.count + 1,
          })
          // cat = data.entries;
        })
    }
  }, [props.category])

  return (
    <div className="data-grid">
      {Array.from(state.data).map((dataUnit) => {
        return (
          <div key={dataUnit.id} className="data-card">
            <div className="info">
              <div className="name">{dataUnit.name != undefined ? dataUnit.name : dataUnit.category}</div>
              <div className="location">
                <svg fill="currentColor" viewBox="0 0 20 20" className="category-icon-svg">
                  <path
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <span> {dataUnit.area} </span>
              </div>
              <div className="location">
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="category-icon-svg"
                >
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>

                <span>{dataUnit.source}</span>
              </div>
              {dataUnit.phone1 ? <div className="phone">{dataUnit.phone1}</div> : null}
              {dataUnit.email1 ? <div className="email">{dataUnit.email1}</div> : null}
            </div>
            <div className="cta">
              <div className="button-group">
                {dataUnit.phone1 ? (
                  <a href={`tel:${dataUnit.phone1}`} className="contact-button">
                    <img src="/assets/phone.svg" />
                    Call
                  </a>
                ) : null}

                {dataUnit.email1 ? (
                  <a href={`mailto:${dataUnit.email1}`} className="contact-button">
                    <img src="/assets/email-icon.svg" />
                    Email
                  </a>
                ) : null}
              </div>
              {dataUnit.sourceurl ? (
                dataUnit.source_link_valid ? (
                  <a className="source-link" target="_blank" href={dataUnit.sourceurl}>
                    Source link
                  </a>
                ) : null
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CategoryData
