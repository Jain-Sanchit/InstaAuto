const puppeteer = require("puppeteer");

const BASE_URL = "https://www.instagram.com/";
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      headless: false,
    });

    instagram.page = await instagram.browser.newPage();
  },

  login: async (username, password) => {

    await instagram.page.goto(BASE_URL, { waiUntil: "networkidle2" });

    // let loginButton=await instagram.page.$x('//a[contains(text(),"Log in")]');

    // /*clicl*/
    // await loginButton[0].click();

    //  await instagram.page.waitForNavigation({ waiUntil: "networkidle2" });

    await instagram.page.waitFor(2000);

    /*username pssword*/
    await instagram.page.type('input[name="username"]',username,{delay:50});
    await instagram.page.type('input[name="password"]', password, { delay: 50 });

    /*click on login*/
    const loginButton = await instagram.page.$x('//button[contains(.,"Log In")]');
    await loginButton[0].click();

    await instagram.page.waitFor(2000);
    await instagram.page.waitFor('a > svg[aria-label="Direct"]');

    
  },

  likeTagsProcess : async(tags =[]) =>{

      for(let tag of tags){
          /*go to tag page*/

          await instagram.page.goto(TAG_URL(tag),{waiUntil:'networkidle2'});
          await instagram.page.waitFor(1000);

          let posts=await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');


          for(let i=0;i<3;i++){
              let post=posts[i];

              /*click on post*/
              await post.click(); 

              /*after image appears*/
              await instagram.page.waitFor('div[role="dialog"]');
              await instagram.page.waitFor(2000);

              let isLikeable =await instagram.page.$('button svg[aria-label="Like"]');
              if(isLikeable){
                   await instagram.page.click('button svg[aria-label="Like"]');
              }
              
              await instagram.page.waitFor(2000);
              /*close post*/
              await instagram.page.click('button svg[aria-label="Close"]');

              await instagram.page.waitFor(2000);
          }
          await instagram.page.waitFor(6000);
         
      }
  }
  
};

module.exports = instagram;
