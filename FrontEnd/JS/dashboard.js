const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
const parcelSentData = [10,8,12,10,7,3,5,10,9,12];
const parcelReceivedData = [5,8,9,10,1,6,7,8,2,3];


new Chart("parcelChart", {
  type: "line",
  data: {
    labels: months,
    datasets: [
      { 
        label: 'Parcel Sent',
        data: parcelSentData,
        borderColor: "red",
        fill: false
      },
      { 
        label: 'Parcel Received',
        data: parcelReceivedData,
        borderColor: "green",
        fill: false
      }
    ]
  },
  options: {
    legend: { display: true },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Number of Parcels'
        }
      }
    }
  }
});
