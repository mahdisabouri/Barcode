const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = wrapper.querySelector(".close"),
copyBtn = wrapper.querySelector(".copy");

function fetchRequest(formData , file) {
    infoText.innerText = " Scannig QR code..."; 
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method:"POST" , body:formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        // console.log(result);
        infoText.innerText = result ? "upload QR code to scan":"Could upload QR code to scan" ;
        if(!result) result;
        wrapper.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        
        wrapper.classList.add("active"); 
        // console.log(result); 
    }).catch(() => {
        infoText.innerText = "Could upload QR code to scan" ;
    });
}

fileInp.addEventListener("change" , e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append("file", file)
    fetchRequest(formData , file);
});
    // for copy text
copyBtn.addEventListener("click" , () => {
   let text = wrapper.querySelector("textarea").textContent;
   navigator.clipboard.writeText(text); 
});

form.addEventListener("click" , () => fileInp.click());
closeBtn.addEventListener("click" , () => wrapper.classList.remove("active"));