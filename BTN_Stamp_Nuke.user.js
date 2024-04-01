// ==UserScript==
// @name         BTN Stamp NUKE test
// @version      1.0
// @description  Deletes all your stamps
// @author       nzbnate
// @match        https://broadcasthe.net/user.php?action=stamps
// @icon         https://broadcasthe.net/favicon.ico
// ==/UserScript==

(function() {
    'use strict';

    // Function to delete all stamps
    function deleteAllStamps() {
        // Select all delete buttons for stamps
        var deleteButtons = document.querySelectorAll('a[href^="user.php?action=del_stamp"]');

        // Function to check if the stamp has been successfully deleted
        function isStampDeleted(stampId) {
            // Example: Check if the stamp with ID 'stampId' is still present on the page
            return !document.querySelector('a[href^="user.php?action=del_stamp"][href*="stampid=' + stampId + '"]');
        }

        // Recursive function to delete stamps one by one
        function deleteStamp(index) {
            if (index < deleteButtons.length) {
                var button = deleteButtons[index];
                var stampId = button.getAttribute('href').match(/stampid=(\d+)/)[1];
                
                // Click the delete button
                button.click();
                console.log('Deleting stamp with index:', index);

                // Wait for 2.5 seconds before checking if the stamp is successfully deleted
                setTimeout(function() {
                    var intervalId = setInterval(function() {
                        if (isStampDeleted(stampId)) {
                            clearInterval(intervalId);
                            console.log('Deleted stamp with index:', index);
                            deleteStamp(index + 1); // Proceed to delete the next stamp
                        }
                    }, 1000); // Check every second
                }, 1500); // 1.5 seconds delay before checking deletion status
            } else {
                // If all stamps are deleted, no need for further action
            }
        }

        // Wait for 1.5 seconds before starting the deletion process
        setTimeout(function() {
            // Start deleting stamps from the first one
            deleteStamp(0);
        }, 1500); // 1.5 seconds delay before starting the deletion process
    }

    // Call the deleteAllStamps function
    deleteAllStamps();
})();
