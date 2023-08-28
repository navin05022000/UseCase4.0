// Call the generateCSVFiles function to start the process of generating CSV files
const API_KEY = "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";//API-key
const fs = require("fs");//import file module

//making prompts as array of object and store it in variable called prompts
const prompts = [
  {
    prompt: "Generate the 5 electric product category(for ex: Refregirator etc) sheet which contains the headers as Product Id(P...),Product Name in to csv format.Generate the refrigerator details sheet for at least 5 companies(for ex: videocon etc) which contains headers as Company,Model Name(for ex M001 etc),Warranty duration,Year of manufacture,Capacity ,Size,Cooling Technology,Price(did not contain comma). in csv format.Generate the Special_offer sheet for electrical product which contains the headers as Company(for ex: Videocon etc),Model Name(for ex M001 etc),Special Offer in csv format.Generate the final_price sheet for electrical product which contains the headers as Company(for ex: Videocon etc),Model Name(for ex M001 etc),Base Price,City,GST Rate(GST rate for the city),Final Price(Including GST) in csv format.Generate the service sheet for electric products which contains headers as Company(for ex=>Videocon),Model Name(for ex M001),Service Catrgory(category of service and installation required for the refrigerator) in csv format.Generate the dealers Detail sheet(20 Dealers) which contains headers  as ID(for ex :D001),Dealers Name(for ex: John etc),Contact Number(for ex :7882256781 etc),Ratings(it should be between 1 to 5),City ,Availablity(offline/online both available). in csv format ",
    filename: "product_categories.csv",
  },
  
];
//making a asynchronous function generateCSVFiles where we call our api to get the response
async function generateCSVFiles() {
//for loop to iterate the prompts which we are store in varibale called prompts
    for (const { prompt, filename } of prompts) {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",//this parameter define the model of chatgpt
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],//this parameter define the format of our message 
        max_tokens: 3500,//this parameter will generate 3500 tokens including input and output token
        temperature: 0.1,//this parameter helps us to generate more appropriate answer(lower value will enhance its capacity)
      }),
    };
//making exception during api call
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );// this url( chat model) we are using here because it generate maximum token up to 4097 token
      const data = await response.json();// converting the response in json format
      console.log("Data through API:", data);

     //make if condition to retrive the response from json object
      if (data.choices && data.choices.length > 0) {
        const content = data.choices[0].message.content;
        console.log("Generated content:", content);

        //write the retrived output in file in csv format
        fs.writeFile(filename, content, (err) => {
          if (err) {
            console.error("Error writing file:", err);
          } else {
            console.log(`CSV file ${filename} saved successfully in your directory`);
           // generateBillableEmployeeCSV(csvFilePath,outputFilePath);
          }
        });
      } else {
        console.error("No choices found in the API response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
//call the function to execute the process
generateCSVFiles();











