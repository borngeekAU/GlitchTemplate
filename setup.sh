#!/bin/bash

# ============================================
# MEDIA KIT TEMPLATE - SETUP SCRIPT
# Configures the template with your brand name
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  MEDIA KIT TEMPLATE SETUP${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if config.json exists
if [ ! -f "config.json" ]; then
    echo -e "${RED}Error: config.json not found!${NC}"
    echo "Please run this script from the template root directory."
    exit 1
fi

# Check for jq (JSON processor)
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}Note: jq not installed. Using manual input mode.${NC}"
    echo ""
    
    # Manual input mode
    read -p "Enter your brand name (e.g., GLITCH_STITCH): " BRAND_NAME
    read -p "Enter your tagline (default: RECOVERED DATA ARCHIVE): " TAGLINE
    TAGLINE=${TAGLINE:-"RECOVERED DATA ARCHIVE"}
    read -p "Enter your social handle (e.g., @chooflag): " HANDLE
    read -p "Enter your contact email: " EMAIL
    
    # Create short name from brand name (first letters)
    SHORT_NAME=$(echo "$BRAND_NAME" | sed 's/[^A-Z_]//g' | sed 's/_/_/g' | cut -c1-3)
    if [ -z "$SHORT_NAME" ]; then
        SHORT_NAME="B_N"
    fi
else
    # Read from config.json
    BRAND_NAME=$(jq -r '.brand.name' config.json)
    TAGLINE=$(jq -r '.brand.tagline' config.json)
    SHORT_NAME=$(jq -r '.brand.short_name' config.json)
    HANDLE=$(jq -r '.social.handle' config.json)
    EMAIL=$(jq -r '.contact.email' config.json)
    
    echo "Using configuration from config.json:"
    echo "  Brand Name: $BRAND_NAME"
    echo "  Tagline: $TAGLINE"
    echo "  Handle: $HANDLE"
    echo "  Email: $EMAIL"
    echo ""
    read -p "Continue with these settings? (y/n): " CONFIRM
    if [ "$CONFIRM" != "y" ]; then
        echo "Aborted. Edit config.json and run again."
        exit 0
    fi
fi

echo ""
echo -e "${YELLOW}Applying configuration...${NC}"

# Function to replace placeholders in files
replace_in_file() {
    local file=$1
    if [ -f "$file" ]; then
        # Replace brand name
        sed -i "s/BRAND_NAME/$BRAND_NAME/g" "$file"
        sed -i "s/GLITCH_STITCH/$BRAND_NAME/g" "$file"
        sed -i "s/glitch_stitch/${BRAND_NAME,,}/g" "$file"
        sed -i "s/glitchstitch/${BRAND_NAME,,}/g" "$file"
        
        # Replace short name
        sed -i "s/G_S/$SHORT_NAME/g" "$file"
        sed -i "s/B_N/$SHORT_NAME/g" "$file"
        
        # Replace handle
        sed -i "s/@chooflag/$HANDLE/g" "$file"
        sed -i "s/@your_handle/$HANDLE/g" "$file"
        
        # Replace email
        sed -i "s/contact@example.com/$EMAIL/g" "$file"
        
        echo "  Updated: $file"
    fi
}

# Update website files
echo "Updating website files..."
replace_in_file "website/index.html"
replace_in_file "website/js/main.js"
replace_in_file "website/js/glitch.js"

# Update documentation
echo "Updating documentation..."
replace_in_file "README.md"
replace_in_file "legal/LICENSE_README.txt"
replace_in_file "planning_documents/content_outline.txt"
replace_in_file "planning_documents/platform_strategy.txt"
replace_in_file "creative_assets/text_content/caption_templates.txt"

# Update deployment guides
echo "Updating deployment guides..."
for file in deployment_guides/*.md; do
    replace_in_file "$file"
done

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  SETUP COMPLETE!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Your media kit has been configured with:"
echo "  Brand: $BRAND_NAME"
echo "  Handle: $HANDLE"
echo "  Email: $EMAIL"
echo ""
echo "Next steps:"
echo "  1. Review the website in website/index.html"
echo "  2. Add your content to creative_assets/"
echo "  3. Deploy using the guides in deployment_guides/"
echo ""
