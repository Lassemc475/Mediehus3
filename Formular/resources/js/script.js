function validate_form(form_object) {
// formstatus holder styr på om der opstår fejl
// sæt bekræftelsesmedelelse i confirm_msg
    var formstatus = 1; 
    var confirm_msg = "Bekræft at du vil sende følgende oplysninger:" + "\n\n"; 
    console.dir (form_object);
// Find de felter, der skal være udfyldt i formularen og gem i array: input_req til indeksering
    var input_req = form_object.querySelectorAll(":required");
    console.dir (input_req);
//Looper input elementerne og tjekker at value attributten er udfyldt og forskellig fra blank
     for(var i = 0; i < input_req.length; i++) {
        
    //Henter tekst node fra inputfeltets label tag
        var labeltext = input_req[i].previousSibling.textContent;
       console.dir (i + " / " + labeltext); 
        //Sæt fejl via handle_error hvis værdien er tom eller hvis den er blank
        if(!input_req[i].value || input_req[i].value == " ") {
            handle_error(input_req[i], "Du skal udfylde feltet " + labeltext.toLocaleLowerCase() + "!"); 
            formstatus = 0;
        }
        else {
            if(formstatus === 1) {
                var inpval = input_req[i].value; 
                confirm_msg += labeltext + ": " + inpval + "\n";
            }
            
            // console.dir (confirm_msg); 
        }
    }
    
    if (formstatus === 1) {
        //Bekræft afsendelse med confirm og confirm_message
        if(confirm(confirm_msg)) {
            //Redirect til en landingpage
            location.href = 'confirmpage.html';
            //eller submit form
            //form_object.submit();
        
        }
    else {
        return false;
    }
       
}
} 


function handle_error(input_object, input_msg) {

if(!input_object.nextElementSibling)  { 
 //Indsætter tilstødende html med fejlbesked efter input feltet
    input_object.insertAdjacentHTML('afterend','<div class="text-error">' + input_msg + '</div>');

 //Eksempel på direkte DOM manipulation med styles
    input_object.style = "background: #ff0";

 //Eksempel på direkte DOM manipulation med tilføjelse af klasse
    input_object.classList.add("field-error");

    input_object.onkeypress = function() { 

        //Tjek om fejl er vist i tidlige validering - altså om næste sibling har klassen text-error, som er sat i et tidligere gennemløb 
        if(input_object.nextElementSibling.classList.contains("text-error")) {
        //Fjern input objektets næste sibling (fejlmeddelelse)
        input_object.nextElementSibling.remove();
        //Nulstil baggrund til auto på input objektet
        input_object.style = "background: auto";
        //Fjern klassen field-error fra input objektet
        input_object.classList.remove("field-error");
        } 
    }
}
    
}  
    