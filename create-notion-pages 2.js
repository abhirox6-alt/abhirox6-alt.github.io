// Notion API Script to Create Draconic Pages
// You'll need to:
// 1. npm install @notionhq/client
// 2. Get your Notion API key from https://www.notion.so/my-integrations
// 3. Share your database/page with the integration

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Initialize Notion client
const notion = new Client({
  auth: 'YOUR_NOTION_API_KEY_HERE', // Replace with your API key
});

// Replace with your Notion page/database ID
const PARENT_PAGE_ID = 'YOUR_PARENT_PAGE_ID_HERE';

async function createNotionPage(title, content) {
  try {
    const response = await notion.pages.create({
      parent: {
        type: 'page_id',
        page_id: PARENT_PAGE_ID,
      },
      icon: {
        type: 'emoji',
        emoji: '🔥',
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
      },
      children: [
        {
          object: 'block',
          type: 'heading_1',
          heading_1: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: title.toUpperCase(),
                },
                annotations: {
                  color: 'orange',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'divider',
          divider: {},
        },
        // Add more blocks based on content parsing
      ],
    });
    
    console.log(`Created page: ${title}`);
    return response;
  } catch (error) {
    console.error(`Error creating page ${title}:`, error);
  }
}

// Example usage
async function main() {
  const documents = [
    {
      title: 'Draconic Content Strategy V2',
      file: 'draconic-content-strategy-v2.md'
    },
    {
      title: 'Draconic Firefighting Strategy',
      file: 'draconic-firefighting-strategy.md'
    },
    // Add other documents
  ];

  for (const doc of documents) {
    const content = fs.readFileSync(
      path.join('/Users/abhinandan/Documents/Warden Projects/Content Strategy + Launch/Final deliverables', doc.file),
      'utf8'
    );
    await createNotionPage(doc.title, content);
  }
}

// Run the script
main().catch(console.error);