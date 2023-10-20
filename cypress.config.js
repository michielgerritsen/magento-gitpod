const { defineConfig } = require("cypress");
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8002',
    supportFile: false,
    setupNodeEvents(on, config) {
        on('after:spec', (spec, results) => {
            // If a retry failed, save the video, otherwise delete it to save time by not compressing it.
            if (results && results.video) {
                // Do we have failures for any retry attempts?
                const failures = results.tests.find(test => {
                    return test.attempts.find(attempt => {
                        return attempt.state === 'failed'
                    })
                });
                // Delete the video if the spec passed on all attempts
                if (!failures) {
                    fs.existsSync(results.video) && fs.unlinkSync(results.video)
                }
            }
        })
    },
  },
});
