let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

let leadsFromLocalStorage = getLeadsFromLocalStorage()
if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage
	render(myLeads)
}

//const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }]

tabBtn.addEventListener("click", function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		console.log(tabs)
		const tab = tabs[0].url
		myLeads.push(tab)
		localStorage.setItem("myLeads", JSON.stringify(myLeads))
		render(myLeads)
	})
})

function render(leads) {
	let listItems = ""
	for (let i = 0; i < leads.length; i++) {
		listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
        `
	}
	ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function () {
	myLeads.push(inputEl.value)
	inputEl.value = ""
	localStorage.setItem("myLeads", JSON.stringify(myLeads))
	render(myLeads)
})

deleteBtn.addEventListener("dblclick", function () {
	localStorage.clear()
	myLeads = []
	render(myLeads)
})

function getLeadsFromLocalStorage() {
	const leads = localStorage.getItem("myLeads")
	return JSON.parse(leads)
}
