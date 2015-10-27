$(document).bind('DOMSubtreeModified', function() {
    alert('hi!');
});

function injectInspections() {

    var results = {};

    $( document ).tooltip({
          items: "[hover], [title]",
          content: function() {
            var element = $( this );
            if ( element.is( "[hover]" ) ) {
              var index = element.attr("hover");

              if(results[index].inspection_date != null) {
                 var inspectionDate = new Date(results[index].inspection_date);
                 var inspectionDateString = (inspectionDate.getMonth() + 1) + "/" + inspectionDate.getDate() + "/" + inspectionDate.getFullYear();
              }
              
              return "<p>" + results[index].inspection_business_name + "</p>" +
              "<p>Inspected: " + inspectionDateString + "</p>";
            }
          }
        });

    $(".regular-search-result").each(function(i) {
        var bizName = $(this).find('.search-result').find('.biz-listing-large').find('.biz-name').text().replace(/’/g, '\'').replace(/&/, ' ');
        var bizAddressHTML = $(this).find('.search-result').find('.biz-listing-large').find('address').html().toString();
        var bizAddress = bizAddressHTML.split("<br>")[0].trim();
        var secondaryAttributeElement = $(this).find('.search-result').find('.biz-listing-large').find('.secondary-attributes');
        var phoneNumberElement = $(this).find('.search-result').find('.biz-listing-large').find('.secondary-attributes').find('.biz-phone');
        var phoneNumber = phoneNumberElement.text().trim();

        secondaryAttributeElement.css('position','relative');
        var baseUrl = 'https://data.kingcounty.gov/resource/f29f-zza5.json';

        debugger;
        $.get(baseUrl + '?' + 'inspection_type=Routine Inspection/Field Review&$order=inspection_date DESC&$limit=1&$q=((' + phoneNumber + ') OR (' + bizAddress + ')) AND (\"' + bizName + '\")', function(data) {

            if (data.length > 0) {
                results[i] = data[0];
                var foodScore = data[0].inspection_score;
                debugger;
                // chrome.extension.getBackgroundPage().console.log('foo');
                var color = 'numberCircleRed';
                if(foodScore < 20) color = 'numberCircleGreen';
                else if(foodScore < 45) color = 'numberCircleBlue';
                secondaryAttributeElement.append("<div hover=" + i + " class=" + color + ">" + foodScore + "</p>");
            } else {
                $.get(baseUrl + '?' + 'inspection_type=Routine Inspection/Field Review&$order=inspection_date DESC&$limit=1&$q=((' + phoneNumber + ') OR (' + bizAddress + '))', function(data2) {
                    if(data2.length > 0) {
                        results[i] = data2[0];
                        var foodScore = data2[0].inspection_score;
                        debugger;
                        // chrome.extension.getBackgroundPage().console.log('foo');
                        var color = 'numberCircleRed';
                        if(foodScore < 20) color = 'numberCircleGreen';
                        else if(foodScore < 45) color = 'numberCircleBlue';
                        secondaryAttributeElement.append("<div hover=" + i + " class=" + color + ">" + foodScore + "</p>");
                    } else {
                        secondaryAttributeElement.append("<div class='numberCircleBlack'>" + '?' + "</p>");
                    }
                });
            }
        });

    });

}

injectInspections();
