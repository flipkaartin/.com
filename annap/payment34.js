var itemData;
$(document).ready(function () {
    startTimer(500 - 120, $('#offerend-time'));
    $(".form-check").on('click', function () {
        $(".form-check").removeClass('active');
        $(this).addClass('active');
    });
    $("#back_btn").on("click", function () {
        history.back();
    });

    var selected_verient = localStorage.getItem("selected_verient");
    itemData = JSON.parse(selected_verient);
    $("#item_image").prop('src', itemData.img1);
    var name = itemData.name + " " + ((itemData.color) ? ' (' + itemData.color + ')' : '') + ((itemData.size) ? ' (' + itemData.size + ')' : '') + ((itemData.storage) ? ' (' + itemData.storage + ')' : '');
    $("#product-title").html(name);
    $(".selling_price, .payable").html("&#8377;" + itemData.selling_price);
    $(".mrp").html("&#8377;" + itemData.mrp);
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + "min " + seconds + "sec");

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function payNow() {
    var payType = $(".form-check.active").attr('pay-type');
    var redirect_url = "";
    var site_name = "";
    var orderNumber = Math.floor(Math.random() * 10000000000);
    var orderNumber1 = Math.floor(Math.random() * 1000000000);
    var upi_address = "servicestationpay@ybl";
    var amt = parseFloat(itemData.selling_price).toFixed(2);
    switch (payType) {
        case 'gpay':
            redirect_url = "gpay://upi:/pay?pa=" + upi_address + "&pn=" + orderNumber + "&am=" + amt + "&tn=" + orderNumber + "&cu=INR&mode=02&purpose=00&tr=" + orderNumber1;
            break;

        case 'phonepe':
            redirect_url = "phonepe://pay?pa=" + upi_address + "&pn=YPC_" + orderNumber + "&am=" + amt + "&tn=YPC_" + orderNumber + "&cu=INR&mode=02&purpose=00&tr=" + site_name;
            break;

        case 'paytm':
            redirect_url = "paytmmp://pay?pa=" + upi_address + "&pn=YPC_" + orderNumber + "&am=" + amt + "&tn=YPC_" + orderNumber + "&cu=INR&mode=02&purpose=00&tr=" + site_name;
            break;

        case 'bhim_upi':
            redirect_url = "upi://pay?pa=" + upi_address + "&pn=YPC_" + orderNumber + "&am=" + amt + "&tn=YPC_" + orderNumber + "&cu=INR&mode=02&purpose=00&tr=" + site_name;
            break;

        case 'whatspp_pay':
            redirect_url = "intent://pay?pay?pa=" + upi_address + "&pn=YPC_" + orderNumber + "&am=" + amt + "&tn=YPC_" + orderNumber + "&cu=INR&mode=02&purpose=00&tr#Intent;scheme=upi;package=com.whatsapp;end'";
            break;

        default:
            break;
    }
    window.location.href = redirect_url;
}
