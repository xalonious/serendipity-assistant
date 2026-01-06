const user = require("../../schemas/economy");
const cron = require("node-cron");

module.exports = async (client) => {
    cron.schedule('0 0 0 * * *', async () => {
        await resetDaily();
    }, {
        timezone: "UTC"
    });
}

async function resetDaily() {
    const users = await user.find();

    for (const user of users) {
        if (user.daily.hasClaimedDaily) {
            user.daily.streak = user.daily.streak + 1;
        } else if (user.daily.streak > 1) {
            user.daily.streak = 1;
        }
        user.daily.hasClaimedDaily = false;
        await user.save();
    }
}
