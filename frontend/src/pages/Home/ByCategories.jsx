import "./ByCategories.css";
import {
  Sparkles,
  Wrench,
  Zap,
  Scissors,
  Palette ,
  Paintbrush
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const iconMap = {
  "Cleaning": <Sparkles size={28}/>,
  "Plumbing": <Wrench size={28}/>,
  "Electrical": <Zap size={28}/>,
  "Beauty": <Scissors size={28}/>,
  "Makeup": <Palette size={28}/>,  
  "Painting": <Paintbrush size={28}/>
};

function ByCategories(){

const [categories, setCategories] = useState([]);
const navigate = useNavigate();

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services/category-counts");
      const data = await res.json();

      // 🔥 format data
      const formatted = data
  .filter(item => item._id !== "Appliance Repair") // 👈 ADD THIS LINE
  .map((item, index) => ({
    id: index,
    title: item._id,
    count: item.count,
    icon: iconMap[item._id] || <Sparkles size={28}/>
  }));
      setCategories(formatted);

    } catch (err) {
      console.log(err);
    }
  };

  fetchCategories();
}, []);

return(

<section className="cat-section">

<div className="cat-container">

<h2 className="cat-title">
Browse Categories
</h2>

<p className="cat-subtitle">
Find the perfect service from our curated categories
</p>

<div className="cat-grid">

{categories.map((cat)=>(

<div 
className="cat-card" 
key={cat.id}
onClick={() => navigate(`/services?category=${encodeURIComponent(cat.title)}`)}
>

<div className="cat-icon">
{cat.icon}
</div>

<h3>{cat.title}</h3>

<p>{cat.count} services</p>

</div>

))}

</div>

</div>

</section>

)

}

export default ByCategories;