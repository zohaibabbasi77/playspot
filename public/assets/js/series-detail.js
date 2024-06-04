$('select').on('change', function() {
    var season  = this.value;
    $.ajax({
       type: "GET",
       url: "{{ route('getseason') }}",
       data: {season:season,seriesid:{{ $series->series_id }}},
       success: function (response) {
          
       }
    });
});