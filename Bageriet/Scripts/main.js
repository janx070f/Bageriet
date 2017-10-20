$(document).ready(function () {
    $('#prodCreate').bootstrapValidator();
    $('#Contact').bootstrapValidator();
    $('#aboutCreate').bootstrapValidator();
    $('#BlogCreate').bootstrapValidator();
    $('#SliderCreate').bootstrapValidator();
     $('#CompanyCreate').bootstrapValidator();

});
$("#Signup-Newsletter").on("submit",
    function () {
        var $this = $(this);
        var values = $this.serialize();
        $.ajax({
            type: $this.attr("method"),
            url: $this.attr("action"),
            data: values,
            success: function () {
                //$("#info-boxContact").addClass("alert-success");
                //$("#info-boxContact").removeClass("alert-danger");
                //$("#info-boxContact").text("Tak for din tilmeldning");
                //$("#info-boxContact").fadeIn().delay(500).fadeOut();
                swal({
                    title: "Success?",
                    text: "Du har nu tilmeldt dig vores nyhedsbrev",
                    type: "success"

                });

                $this.trigger("reset");

            },
            error: function () {
                swal({
                    title: "Error?",
                    text: "HOV.....noget gik galt- prøv igen",
                    type: "error"

                });
            }
            //swal('Congratulations!', 'Your message has been successfully sent', 'success');

        });
        event.preventDefault();
    });
//$("#Signup-Newsletter").on("submit",
//    function (event) {
//        var $this = $(this);
//        var values = $this.serialize();
//        if ($this.children("input[type = "text"]").is(":empty")); {
//            $("#Info-box").addClass("alert-danger");
//            $("#Info-box").removeClass("alert-success");
//            $("#Info-box").html("Der gik noget galt");
//            $("#Info-box").css("display", "block");

//        } else{

//        $.ajax({
//            type: $this.attr('method'),
//            url: $this.attr('action'),
//            data: values,,
//            success: function() {
//                $("#Info-box").addClass("alert-success");
//                $("#Info-box").removeClass("alert-danger");
//                $("#Info-box").text("Du er nu tilmeldt");
//                $("#Info-box").css("display", "block");
//                $this.trigger("reset");
//            },
//            error: function() {
//                $("#Info-box").addClass("alert-danger");
//                $("#Info-box").removeClass("alert-success");
//                $("#Info-box").html("Der gik noget galt");
//                $("#Info-box").css("display", "block");
//            },
//        }
//        });

