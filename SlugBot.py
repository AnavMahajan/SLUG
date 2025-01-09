import openai
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, InputMediaPhoto
from telegram.ext import Application, CallbackQueryHandler, MessageHandler, CallbackContext, CommandHandler, filters
from telegram.ext import ChatMemberHandler

# Enable logging to track events and errors
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)
logger = logging.getLogger(__name__)

# Set your OpenAI API key for AI functionality
openai.api_key = 'YOUR_OPENAI_API_KEY'  # <-- Replace with your OpenAI API key

# Define the welcome function with a menu of buttons
async def welcome(update: Update, context: CallbackContext):
    # Check if the event is triggered by a callback query or a regular message
    if update.message:
        message = update.message
    elif update.callback_query:
        message = update.callback_query.message
    else:
        return  # Handle the case where there's neither a message nor callback query

    # Send the welcome message first
    await message.reply_text(
        "Hi, I’m SlugBot! I was developed by Glitch the Hacker (another sliminion) to provide all $Slug and Hedera info in one place. "
        "Use the buttons below to get started:"
    )

    # Send the image after the text message
    await message.reply_photo(open('slimy.png', 'rb'), caption="Meet Slimy the brave! First Sliminion to Join Hedera's Nexus")

    # Define the buttons for the reply markup
    keyboard = [
        [InlineKeyboardButton("Info about $Slug Coin", callback_data='info')],
        [InlineKeyboardButton("Connect with us on Social Media", callback_data='social')],
        [InlineKeyboardButton("Explore NFT Characters", callback_data='nft')],
        [InlineKeyboardButton("Shop Official Merchandise", callback_data='shop')],
        [InlineKeyboardButton("Reach out for Support", callback_data='support')],
        [InlineKeyboardButton("Latest Updates", callback_data='latest')],
        [InlineKeyboardButton("Community Guidelines", callback_data='guidelines')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # Send the message with the buttons after the image
    await message.reply_text(
        "Use the buttons below to get started:",
        reply_markup=reply_markup
    )

# Define the info function about $Slug Coin
async def info(update: Update, context: CallbackContext):
    keyboard = [[InlineKeyboardButton("Back to Main Menu", callback_data='welcome')]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.callback_query.answer()
    # Send images as media after the text message
    await update.callback_query.edit_message_text(
        "Introducing **Slug Coin**: the fun and vibrant meme coin!\n\n"
        "The SLUG Project is an exciting open-source meme coin that leverages the power of the Hedera Hashgraph network. "
        "Join us on this thrilling ride as we develop, expand, and grow the SLUG Project with Hedera’s groundbreaking technology. "
        "Learn more about the SLUG Project and how you can be a part of it!\n\n"
        "Key Stats:\n"
        "- Token Locked 5% and Growing\n"
        "- ~25k Market Cap\n"
        "- NFT Series\n"
        "- Airdrops and Meme Competitions\n"
        "- 80+ Loyal Holders\n"
        "- 100+ X Followers\n\n"
        "Visit our official website for more details: https://hbarslug.live/",
        reply_markup=reply_markup
    )

# Define the guidelines function for community guidelines
async def guidelines(update: Update, context: CallbackContext):
    keyboard = [[InlineKeyboardButton("Back to Main Menu", callback_data='welcome')]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.callback_query.answer()
    await update.callback_query.edit_message_text(
        "🚨 **Community Guidelines for Slug Coin** 🚨\n\n"
        "Welcome to the Slug Coin community! We're here to stay and build a bright future together! Please remember:\n\n"
        "- Be respectful towards other members. Kindness and inclusivity are key.\n"
        "- Contribute positively to the project. Your input, ideas, and enthusiasm are valued.\n"
        "- Respect differing opinions. We're all here to learn and grow together.\n"
        "- Help maintain a supportive environment for everyone.\n"
        "- Avoid spamming, trolling, or spreading misinformation.\n\n"
        "Let's build something amazing for the future! 🚀\n\n"
        "For more information or to report issues, please reach out to us on our Telegram.\n",
        reply_markup=reply_markup
    )

# Define the latest updates function
async def latest(update: Update, context: CallbackContext):
    keyboard = [[InlineKeyboardButton("Back to Main Menu", callback_data='welcome')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.callback_query.answer()
    await update.callback_query.edit_message_text(
        "Latest Updates for $Slug Coin\n\n"
        "1. The Meme Competition is currently ongoing. Join now for a chance to win exciting rewards.\n"
        "2. Airdrop 2 is launching soon. Stay tuned for more free token distributions.\n"
        "3. We are moving towards Governance by the Board Members. This is a step towards more decentralized decision-making.\n"
        "4. Our new V2 platform is live, featuring a completely redesigned website.\n\n"
        "Stay engaged with us as we continue to bring fun, innovation, and exciting developments to the community.\n",
        reply_markup=reply_markup
    )

# Define the NFT function to display NFT characters and link
async def nft(update: Update, context: CallbackContext):
    # Send images for the Info section
    media = [
        InputMediaPhoto(open('slimy.png', 'rb'), caption="Meet Slimy the brave!, Bolt the Speedster!, Glitch the Hacker - our tech genius! & Nova the Navigator"),
        InputMediaPhoto(open('bolt.jpg', 'rb'), caption="Bolt"),
        InputMediaPhoto(open('glitch.jpeg', 'rb'), caption="Glitch the Hacker - our tech genius!"),
        InputMediaPhoto(open('nova.jpeg', 'rb'), caption="Nova the Navigator")
    ]
    keyboard = [[InlineKeyboardButton("Back to Main Menu", callback_data='welcome')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.callback_query.answer()
    await update.callback_query.edit_message_text(
        "Meet the characters of Slug Coin:\n"
        "1. **Slimy** - The brave leader\n"
        "2. **Bolt** - The speedster for speed\n"
        "3. **Glitch** - The hacker for tech\n"
        "4. **Nova** - The navigator\n\n"
        "These characters embody the spirit of the Slug Coin revolution in the meme world!\n\n"
        "Explore our full NFT collection: [Slug Coin NFTs](https://hbarslug.live/nfts)",
        reply_markup=reply_markup
    )
    await update.callback_query.message.reply_media_group(media)

# Define the shop function to link to the merchandise store
async def shop(update: Update, context: CallbackContext):
    keyboard = [[InlineKeyboardButton("Back to Main Menu", callback_data='welcome')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.callback_query.answer()
    await update.callback_query.edit_message_text(
        "Visit our official shop and get your Slug Coin merchandise here: [Slug Coin Shop](https://hbarslug.live/)",
        reply_markup=reply_markup
    )

# Define the social function for social media links
async def social(update: Update, context: CallbackContext):
    keyboard = [
        [InlineKeyboardButton("Follow us on X", url="https://x.com/HBARSLUG")],
        [InlineKeyboardButton("Join our Telegram", url="https://t.me/slugofficial")],
        [InlineKeyboardButton("Visit our Website", url="https://hbarslug.live/")],
        [InlineKeyboardButton("Explore Memejob Fun Token", url="https://memejob.fun/token/0.0.7988483")],
        [InlineKeyboardButton("Back to Main Menu", callback_data='welcome')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.callback_query.answer()
    await update.callback_query.edit_message_text(
        "Connect with us on social media and stay updated with all things Slug Coin!\n\n"
        "Follow us for the latest news, updates, and community discussions:",
        reply_markup=reply_markup
    )

# Define the support function to handle outreach
async def support(update: Update, context: CallbackContext):
    keyboard = [[InlineKeyboardButton("Back to Main Menu", callback_data='welcome')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.callback_query.answer()
    await update.callback_query.edit_message_text(
        "For any support or inquiries, reach out to our Slug community via our Telegram group:\n"
        "[Join Telegram Support](https://t.me/slugofficial)\n\n"
        "Our team will assist you shortly!",
        reply_markup=reply_markup
    )

# Handle the button presses
async def button(update: Update, context: CallbackContext):
    query = update.callback_query
    query.answer()

    # Log the callback data to debug
    logger.info(f"Received callback data: {query.data}")

    # Routing for button clicks
    if query.data == 'welcome':
        await welcome(update, context)
    elif query.data == 'info':
        await info(update, context)
    elif query.data == 'latest':
        await latest(update, context)
    elif query.data == 'nft':
        await nft(update, context)
    elif query.data == 'shop':
        await shop(update, context)
    elif query.data == 'social':
        await social(update, context)
    elif query.data == 'support':
        await support(update, context)
    elif query.data == 'guidelines':
        await guidelines(update, context)
    else:
        # Log and default fallback to /start
        logger.warning(f"Unrecognized callback data: {query.data}. Defaulting to welcome.")
        await welcome(update, context)

# Handle user messages that are not button presses
async def handle_text(update: Update, context: CallbackContext):
    await welcome(update, context)  # Redirect to the welcome message if the message is not a button press

# Handle new member joining the channel and starting the bot
async def new_member(update: Update, context: CallbackContext):
    for new_member in update.message.new_chat_members:
        await welcome(update, context)

# Main function
def main():
    # Replace with your actual Bot token from BotFather
    TOKEN = 'mytoken'  # <-- Replace with your actual token!

    try:
        # Create the Application and pass the bot's token
        application = Application.builder().token(TOKEN).build()

        # Add the welcome handler and callback handler for button clicks
        application.add_handler(CommandHandler("start", welcome))  # First run action
        application.add_handler(CallbackQueryHandler(button))  # Handle button presses
      #  application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text))  # Handle non-button text messages
        application.add_handler(ChatMemberHandler(new_member))  # Handle new members

        # Start the bot
        logger.info("Bot is starting...")
        application.run_polling()

    except Exception as e:
        logger.error(f"Error occurred: {e}")
        raise

if __name__ == '__main__':
    main()
