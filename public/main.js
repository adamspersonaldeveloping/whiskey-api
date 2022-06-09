
const update = document.querySelector('#update-button')
const deleteText = document.querySelectorAll('.trash')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteWhiskey)
})


async function deleteWhiskey(){
    const name = this.parentNode.childNodes[1].innerText
    const maker = this.parentNode.childNodes[3].innerText
    try{
        const res = await fetch('deleteWhiskey', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'nameS': name,
                'makerS': maker

            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

