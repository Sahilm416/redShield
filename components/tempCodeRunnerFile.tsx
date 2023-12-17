const res = await fetch("/AuthSuccess",{
            next:{revalidate: 0},
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
               
            },
            body: JSON.stringify({
              'name': "cool"
            })
          })