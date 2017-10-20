$(document).ready(function () {
    $("#validate_advanced").click(function () {
        $.each($("input"), function (index,value) { /*Index er tallet value er objektet*/
            if ($(this).data("field") === "required") {
                if (!$(this).val()) {
                    showError(this, "Du skal udfylde feltet");
                    $(this).bind("keydown", function () {
                        hideError(this);
                    });
                    return false;
                }
            }
            if(this.type === "email" && this.value) {
                if (!isValidEmail(this.value)) {
                    showError(this, "Du skal indtaste en gyldig email");
                    return false;
                }
            }
            if (this.type === "tel" && this.value) {
                if (!isValidNumber(this.value)) {
                    showError(this, "Du skal indtaste dit Telefonnummer");
                    return false;
                }
            }
        });
    });
});

function showError(objField, errMsg) {
    if(!$(objField).next().hasClass("text-danger")) {
        $(objField).after("<span class=\"text-danger\">" + errMsg + "</span>");
        $(objField).css("border", "solid 1px #f00");
    }
}
function hideError(objField) {
    if ($(objField).next().hasClass("text-danger")) {
        $(objField).next().remove();
        $(objField).css("border", "");
    }
}
//Tjekker om værdi har en gyldig email syntaks
function isValidEmail(value) {
    var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return pattern.test(value);
}
//Tjekker om værdi er et nummer
function isValidNumber(value) {
    var pattern = /^[0-9]+$/;
    return pattern.test(value);
}