(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav: false
    });

    var dataLine = [];
    var box_1 = document.getElementById('box_1')
    var box_2 = document.getElementById('box_2')
    var box_3 = document.getElementById('box_3')
    var box_4 = document.getElementById('box_4')
    var box_5 = document.getElementById('box_5')
    var box_6 = document.getElementById('box_6')

    async function fetchParcelsData() {

        const response = await fetch(`http://localhost:8080/company_owner/shipments/month/2023`);
        if (response.ok) {
            const parcelData = await response.json();
            console.log(parcelData);
            dataLine = Object.values(parcelData);
            console.log(dataLine);

            // Initialize the chart after fetching the data
            initializeChart();
        } else {
            console.error('Failed to fetch user data:', response.statusText);
        }
    }

    // Single Line Chart
    function initializeChart() {
        var ctx3 = $("#line-chart").get(0).getContext("2d");
        var myChart3 = new Chart(ctx3, {
            type: "line",
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                datasets: [{
                    label: "Parcel",
                    fill: false,
                    backgroundColor: "rgba(0, 156, 255, .3)",
                    data: dataLine
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    

    async function getTransactionPoint() {
        const response = await fetch(`http://localhost:8080/company_owner/transaction/number`);
        if (response.ok) {
            const parcelData = await response.json();
            box_1.innerText = parcelData;
            box_3.innerText = parcelData
        } else {
            console.error('Failed to fetch user data:', response.statusText);
        }
    }

    async function getSettlementPoint() {
        const response = await fetch(`http://localhost:8080/company_owner/settlement/number`);
        if (response.ok) {
            const parcelData = await response.json();
            box_2.innerText = parcelData;
            box_4.innerText = parcelData;
        } else {
            console.error('Failed to fetch user data:', response.statusText);
        }
    }

    async function getParcelsSent() {
        const response = await fetch(`http://localhost:8080/company_owner/shipments/sent`);
        if (response.ok) {
            const parcelData = await response.json();
            box_5.innerText = parcelData;
        } else {
            console.error('Failed to fetch user data:', response.statusText);
        }
    }

    async function getParcelsReceived() {
        const response = await fetch(`http://localhost:8080/company_owner/shipments/received`);
        if (response.ok) {
            const parcelData = await response.json();
            box_6.innerText = parcelData;

        } else {
            console.error('Failed to fetch user data:', response.statusText);
        }
    }

    // Call the function when the page loads
    window.onload = function() {
        fetchParcelsData();
        getTransactionPoint();
        getSettlementPoint();
        getParcelsSent();
        getParcelsReceived();
    }
})(jQuery);

