import React,
{
  useEffect,
  useState,
} from "react";

import "./AdminContactQuery.css";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

const Contacts = () => {

const [contacts, setContacts] =
useState([]);

const [search, setSearch] =
useState("");


// FETCH

const fetchContacts = async () => {

  try {

    const res = await fetch(

`${import.meta.env.VITE_API_URL}/api/contact`

    );

    const data = await res.json();

    setContacts(data);

  } catch (err) {

    console.log(err);

  }

};


useEffect(() => {
  fetchContacts();
}, []);


// RESOLVE

const resolveQuery = async (id) => {

  try {

    await fetch(

`${import.meta.env.VITE_API_URL}/api/contact/resolve/${id}`,

{
  method: "PUT",
}

    );

    fetchContacts();

  } catch (err) {

    console.log(err);

  }

};


// EXPORT EXCEL

const exportExcel = () => {

const worksheet =
XLSX.utils.json_to_sheet(
  contacts
);

const workbook =
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
  workbook,
  worksheet,
  "Contacts"
);

const excelBuffer =
XLSX.write(workbook, {
  bookType: "xlsx",
  type: "array",
});

const fileData =
new Blob(
  [excelBuffer],
{
type:
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}
);

saveAs(
  fileData,
  "Skillora_Contacts.xlsx"
);

};


const filtered =
contacts.filter((item)=>

item.name
.toLowerCase()
.includes(search.toLowerCase())

);

return (

<div className="contacts-page">

<div className="contacts-top">

<div>
<h1>Contact Queries</h1>

<p>
Manage all support requests
</p>
</div>

<button
className="export-btn"
onClick={exportExcel}
>
Export Excel
</button>

</div>


<div className="contacts-search">

<input
type="text"
placeholder="Search queries..."
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
/>

</div>


<div className="contacts-table">

<table>

<thead>

<tr>

<th>User</th>
<th>Email</th>
<th>Subject</th>
<th>Status</th>
<th>Date</th>
<th>Actions</th>

</tr>

</thead>


<tbody>

{filtered.map((item)=>(

<tr key={item._id}>

<td>{item.name}</td>

<td>{item.email}</td>

<td>{item.subject}</td>

<td>

<span
className={
item.status === "resolved"
? "resolved"
: "pending"
}
>

{item.status}

</span>

</td>

<td>
{new Date(
item.createdAt
).toLocaleDateString()}
</td>

<td>

{item.status ===
"pending" && (

<button
className="resolve-btn"
onClick={()=>
resolveQuery(item._id)
}
>

Resolve

</button>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

};

export default Contacts;