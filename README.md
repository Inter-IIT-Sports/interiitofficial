This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Adding Sport Images

The system is designed so you can easily add images for any sport without needing to change the core code. Just follow these two steps:

### Step 1: Add Your Images

Place the new image files you want to use into the following directory: `public/images/background/`

### Step 2: Update the Mapping File

Open the file located at: `lib/sportImageMapping.js`

Inside this file, you will find a `sportImages` object. To add images for a new sport (or to add more images to an existing one), you just need to add a new line to this object.

*   The **key** must be the name of the sport, in all lowercase letters and **without any spaces**. For example, for "Table Tennis", the key would be `tabletennis`.
*   The **value** must be an array of strings, where each string is the path to your image. Make sure the path starts with `/images/background/`.

**Example:**

Let's say you add two images for Tennis, `tennis_1.jpg` and `tennis_2.jpg`, to the `public/images/background/` folder. You would update the `sportImageMapping.js` file to look like this:

```javascript
export const sportImages = {
  badminton: [
    '/images/background/badminton_1.jpg',
    '/images/background/badminton_2.jpg',
    '/images/background/badminton_3.jpg',
  ],
  tennis: [
    '/images/background/tennis_1.jpg',
    '/images/background/tennis_2.jpg',
  ],
  tabletennis: [
    '/images/background/tabletennis_1.png',
    '/images/background/tabletennis_2.png',
  ],
  // You can add more sports here following the same format
};
```

That's all. The website will automatically use your new images for the correct sports cards.