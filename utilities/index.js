const invModel = require("../models/inventory-model")
const Util = {}

/* Build nav */
Util.getNav = async function () {
  const data = await invModel.getClassifications()
  let list = '<ul class="nav-list">'
  list += '<li><a href="/">Home</a></li>'

  data.rows.forEach(row => {
    list += `
      <li>
        <a href="/inv/type/${row.classification_id}">
          ${row.classification_name}
        </a>
      </li>
    `
  })

  list += "</ul>"
  return list
}

/* Build classification grid */
Util.buildClassificationGrid = async function (data) {
  if (data.length < 1) {
    return '<p class="notice">Sorry, no matching vehicles found.</p>'
  }

  let grid = '<ul id="inv-display">'
  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}"
               alt="${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <div class="namePrice">
          <h2><a href="/inv/detail/${vehicle.inv_id}">${vehicle.inv_make} ${vehicle.inv_model}</a></h2>
          <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
        </div>
      </li>
    `
  })
  grid += "</ul>"
  return grid
}

/* Build detail view */
Util.buildDetailView = async function (v) {
  return `
    <section class="vehicle-detail">
      <div class="vehicle-detail-container">
        <img class="vehicle-detail-img" src="${v.inv_image}" 
              alt="${v.inv_make} ${v.inv_model}">
        <div class="vehicle-detail-info">
          <h2>${v.inv_year} ${v.inv_make} ${v.inv_model}</h2>
          <p class="price">$${new Intl.NumberFormat("en-US").format(v.inv_price)}</p>
          <p class="miles">${new Intl.NumberFormat("en-US").format(v.inv_mileage)} miles</p>
          <p class="color">Color: ${v.inv_color}</p>
          <p class="description">${v.inv_description}</p>
        </div>
      </div>
    </section>
  `
}

/* GLOBAL TEMPLATE RENDER */
Util.render = function (res, view, options) {
  res.render(view, options, (err, html) => {
    if (err) throw err

    res.render("template", {
      ...options,
      body: html
    })
  })
}

/* ==========================================
   SELECT LIST DE CLASIFICACIONES
   ========================================== */
Util.buildClassificationList = async function (classification_id = null) {
  const data = await invModel.getClassifications();
  let classificationList =
    '<select name="classification_id" id="classificationList" required>';
  classificationList += "<option value=''>Choose a Classification</option>";

  data.rows.forEach((row) => {
    classificationList += `<option value="${row.classification_id}"`;
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected";
    }
    classificationList += `>${row.classification_name}</option>`;
  });

  classificationList += "</select>";
  return classificationList;
};


module.exports = Util
