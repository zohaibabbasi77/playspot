// const { ajax } = require("jquery");

function showplans(){
    $('#otp-div').hide();
    $('#plans-div').removeClass('d-none');
    $('#plans-div').show();
}
function sendotp(phone){
    var msisdn= '92'+phone.substring(1);
    $.ajax({
        type: "POST",
        url: "https://api.deikho.com/api/sendOtp",
        data: {msisdn:msisdn},
        success: function (response) {
            if (response.status ==true) {
                otp = response.data.otp;
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                    })
        
                    Toast.fire({
                    icon: 'success',
                    title: 'OTP sent successfully'
                    })
                showOtpScreen();
                // alert(otp);
            }else{
                $(".se-pre-con").fadeOut("slow");
                $.alert('Problem sending otp! Try Again');
            }
        }
    });
}
function showOtpScreen(){
    $('#loginregdiv').hide();
    $('#otp-div').removeClass('d-none');
    $('#otp-div').show();
    $(".se-pre-con").fadeOut("slow");
}
function back(){
    $('#loginregdiv').show();
    $('#otp-div').hide();
    $('#plans-div').hide();
}



