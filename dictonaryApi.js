let inputSearch =  document.querySelector('#inputSearch')
let display=document.querySelector('#display')
inputSearch.addEventListener('change', e=>{
    let value=e.target.value
    fetchFunc(value)
})
const fetchFunc = async (value)=>{
    if(value){
     await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
    .then(async (res) => {
        let audioSrc=res?.data?.[0]?.phonetics?.[0]?.audio
            display.innerHTML= `
            <section>
            <article>
                <br/>
                ${audioSrc ? `<aside style='display:flex'>
                    <img src="https://societyfortheblind.org/wp-content/uploads/2013/10/icon-news-listen.png" alt="listen" width="30" height="30">
                    <audio controls>
                        <source src=${audioSrc ? audioSrc : ''}>
                        Your browser does not support the audio tag.
                    </audio>
                </aside>
                <aside>
                    <h2>
                        Meaning
                    </h2>
                </aside>
                <aside>
                    <p>
                        ${res?.data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition}
                    </p>
                </aside>`
:
                `<aside>
                <h2>
                    Meaning
                </h2>
            </aside>
            <aside>
                <p>
                    ${res?.data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition}
                </p>
            </aside>`
        }

            </article>
        </section>
            `
    })
    .catch( (err) => {
        if(err?.response?.status==404){
            display.innerHTML= `
    <section>
        <article>
            <br/>
            <aside>
                <img src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-1024.png" alt="listen" width="100" height="100">
            </aside>
            <aside>
                <h2>
                    ${err?.response?.status}
                </h2>
            </aside>
            <aside>
                <h3>
                    ${err?.response?.data?.title}
                </h3>
                <p>
                    ${err?.response?.data?.message}
                </p>
                <p>
                    ${err?.response?.data?.resolution}
                </p>
            </aside>
        </article>
    </section>
            `
          }
    });
}
}
fetchFunc()