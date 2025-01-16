import { faker } from '@faker-js/faker';
import { generateShortCode } from '../modules/url/url.utils';
import { Url } from '../modules/url/url.model';

const seedCount = 10000;

export const seedUrls = async () => {
    try {
        const urlsToInsert = [];
        for (let i = 0; i < seedCount; i++) {
            const fakeUrl = faker.internet.url();
            const shortCode = generateShortCode();

            urlsToInsert.push({
                originalUrl: fakeUrl,
                shortCode: shortCode
            });
        }

        const insertedUrls = await Url.insertMany(urlsToInsert);

        console.log(`${insertedUrls.length} fake URLs inserted successfully!`);

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};
