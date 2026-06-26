import { useEffect,useState } from "react";

import MainLayout from "../layouts/MainLayout";

import GoalCard from "../components/GoalCard";

import GoalModal from "../components/GoalModal";

import { goalAPI } from "../services/api";

import toast from "react-hot-toast";

const Goals=()=>{

const [goals,setGoals]=useState([]);

const [modal,setModal]=useState(false);

const [editing,setEditing]=useState(null);

useEffect(()=>{

loadGoals();

},[]);

const loadGoals=async()=>{

try{

const res=await goalAPI.getAll();

setGoals(res.data);

}

catch{

toast.error("Cannot load goals");

}

}

const saveGoal=async(goal)=>{

try{

if(editing){

await goalAPI.update(editing.id,goal);

toast.success("Goal Updated");

}

else{

await goalAPI.create(goal);

toast.success("Goal Added");

}

setModal(false);

setEditing(null);

loadGoals();

}

catch{

toast.error("Operation Failed");

}

}

const deleteGoal=async(id)=>{

if(!window.confirm("Delete Goal?")) return;

await goalAPI.delete(id);

toast.success("Goal Deleted");

loadGoals();

}

return(

<MainLayout>

<div className="flex justify-between items-center mb-8">

<h1 className="text-3xl font-bold">

Financial Goals

</h1>

<button

onClick={()=>{

setEditing(null);

setModal(true);

}}

className="bg-[#1a6b5e] text-white px-5 py-3 rounded-xl">

+ Add Goal

</button>

</div>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

{

goals.map(goal=>(

<GoalCard

key={goal.id}

goal={goal}

onEdit={(g)=>{

setEditing(g);

setModal(true);

}}

onDelete={deleteGoal}

/>

))

}

</div>

<GoalModal

isOpen={modal}

goal={editing}

onClose={()=>{

setModal(false);

setEditing(null);

}}

onSave={saveGoal}

/>

</MainLayout>

);

}

export default Goals;