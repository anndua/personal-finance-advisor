import { useState, useEffect } from "react";

const GoalModal = ({
    isOpen,
    onClose,
    onSave,
    goal
}) => {

    const [formData,setFormData]=useState({

        name:"",
        targetAmount:"",
        currentAmount:"",
        deadline:""

    });

    useEffect(()=>{

        if(goal){

            setFormData(goal);

        }

        else{

            setFormData({

                name:"",
                targetAmount:"",
                currentAmount:"",
                deadline:""

            });

        }

    },[goal]);

    if(!isOpen) return null;

    const submit=(e)=>{

        e.preventDefault();

        onSave({

            ...formData,

            targetAmount:Number(formData.targetAmount),

            currentAmount:Number(formData.currentAmount)

        });

    }

    return(

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">

<div className="bg-white rounded-2xl p-8 w-full max-w-md">

<h2 className="text-2xl font-bold mb-6">

{goal?"Edit Goal":"Add Goal"}

</h2>

<form onSubmit={submit}>

<input
className="w-full border rounded-xl p-3 mb-4"
placeholder="Goal Name"
value={formData.name}
onChange={(e)=>setFormData({...formData,name:e.target.value})}
/>

<input
type="number"
className="w-full border rounded-xl p-3 mb-4"
placeholder="Target Amount"
value={formData.targetAmount}
onChange={(e)=>setFormData({...formData,targetAmount:e.target.value})}
/>

<input
type="number"
className="w-full border rounded-xl p-3 mb-4"
placeholder="Current Amount"
value={formData.currentAmount}
onChange={(e)=>setFormData({...formData,currentAmount:e.target.value})}
/>

<input
type="date"
className="w-full border rounded-xl p-3 mb-6"
value={formData.deadline}
onChange={(e)=>setFormData({...formData,deadline:e.target.value})}
/>

<div className="flex justify-end gap-3">

<button
type="button"
onClick={onClose}
className="border rounded-xl px-5 py-2">

Cancel

</button>

<button
className="bg-[#1a6b5e] text-white rounded-xl px-5 py-2">

Save

</button>

</div>

</form>

</div>

</div>

    );

}

export default GoalModal;