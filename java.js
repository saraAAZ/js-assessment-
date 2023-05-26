document.addEventListener('DOMContentLoaded', function() {
    var quoteList = [];
    var filteredList = [];

    // Fetch quote data from the API
    fetch('https://dummyjson.com/quotes')
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data from API');
        }
      })
      .then(function(data) {
        quoteList = data.quotes;
        filteredList = quoteList.slice();
        displayQuotes(filteredList);

        // Filter quotes on input change
        document.getElementById('filterInput').addEventListener('input', function() {
          var filterText = this.value.toLowerCase();
          filteredList = quoteList.filter(function(quote) {
            return quote.quote.toLowerCase().includes(filterText);
          });
          displayQuotes(filteredList);
        });
      })
      .catch(function(error) {
        displayError(error.message);
      });

    function displayQuotes(quotes) {
      var quoteListElement = document.getElementById('quoteList');
      quoteListElement.innerHTML = '';
      if (quotes.length === 0) {
        quoteListElement.innerHTML = '<li>No quotes found.</li>';
      } else {
        quotes.forEach(function(quote) {
          var listItem = document.createElement('li');
          listItem.textContent = quote.quote;
          quoteListElement.appendChild(listItem);
        });
      }
    }

    function displayError(message) {
      var errorMessage = document.getElementById('errorMessage');
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }
  });