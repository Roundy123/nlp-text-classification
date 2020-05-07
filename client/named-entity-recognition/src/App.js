import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Container,
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import ReactWordcloud from "react-wordcloud";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: `Economics is a complex subject filled with a maze of confusing terms and details which can be difficult to explain. Even economists have trouble defining exactly what economics means. Yet, there is no doubt that the economy and the things we learn through economics affects our everyday lives.


      In short, economics is the study of how people and groups of people use their resources. Money certainly is one of those resources, but other things can play a role in economics as well. In an attempt to clarify all this, let's take a look at the basics of economics and why you might consider studying this complex field.
      
      
      The Field of Economics
      Economics is divided into two general categories: microeconomics and macroeconomics. One looks at the individual markets while the other looks at an entire economy.
      
      From there, we can narrow economics into a number of subfields of study. These include econometrics, economic development, agricultural economics, urban economics, and much more.
      
      If you have an interest in how the world works and how financial markets or industry outlooks affect the economy, you might consider studying economics. It's a fascinating field and has career potential in a number of disciplines, from finance to sales to the government. 
      
      
      Two Essential Concepts of Economics
      Much of what we study in economics has to do with money and the markets. What are people willing to pay for something? Is one industry doing better than another? What is the economic future of the country or world? These are important questions economists examine and it comes with a few basic terms.
      
      Supply and Demand is one of the first things we learn in economics. Supply speaks to the quantity of something that's available for sale while demand refers to the willingness to purchase it. If the supply is higher than the demand, the market is thrown off balance and costs typically decrease. The opposite is true if demand is greater than the supply available because that commodity is more desirable and harder to obtain.
      
      Elasticity is another key concept in economics. Essentially, here we're talking about how much the price of something can fluctuate before it has a negative impact on sales. Elasticity ties into demand and some products and services are more elastic than others.
      
      
      Understanding the Financial Markets
      As you might expect, many of the factors that play into economics have to do with the financial markets. This is also a complicated matter with many subtopics that you can dive into.
      
      First and foremost, it's important to understand how prices are set in a market economy. At the heart of this is information and what is known as a contingent contract. Essentially, this type of arrangement places stipulations on the price paid based on external factors: if X happens, then I'll pay this much.
      
      One question that many investors have is "What happens to my money when stock prices go down?" The answer is not easy, and before you dive into the stock market, it's essential that you know how it works.
      
      To further complicate things, economic situations like a recession can throw many things off. For instance, just because an economy goes into recession, doesn't mean that prices will fall. In fact, it's the opposite for things like housing. Quite often, prices go up because supply is down and demand is up. This rise in prices is known as inflation.
      
      Interest rates and exchange rates also cause fluctuations in the markets. You will often hear economists express concern over these. When interest rates go down, people tend to buy and borrow more. Yet, this can cause interest rates to rise in the end.
      
      Exchange rates refer to how the currency of one country compares to those of another. These are key components in the global economy.
      
      Other terms you'll hear in reference to the markets are opportunity costs, cost measures, and monopolies. Each is a key element in understanding the overall economic forecast.
      
      Measuring Economic Growth and Decline
      Whether on a national or global scale, measuring the health of the economy is no easy feat. Nationally, we use terms like GDP, which stands for Gross Domestic Product. This refers to the market value of a country's goods and services. Each country's GDP is analyzed by entities like the World Bank and International Monetary Fund (IMF).
      
      There is also much discussion these days about globalization. The concerns over countries like the U.S. outsourcing jobs has many fearing a higher unemployment rate and sagging economy. Yet, some argue that advancements in technology do just as much for employment as globalization.
      
      Every now and then, you will hear government officials discussing fiscal stimulus. This is one theory for encouraging economic growth, particularly in tougher times. But again, it's really not as easy as creating jobs that will lead to more consumer spending.
      
      As with all things in economics, nothing is simple. That is precisely why this topic is so intriguing and keeps economists up late at night. Predicting the wealth of a nation or the world is no easier than predicting your own gains 10 or 15 years into the future. There are too many variables that come into play, which is why economics is an endless field of study.`,
      apiOutput: [
        { text: "CARDINAL", value: 9 },
        { text: "DATE", value: 2 },
        { text: "GPE", value: 1 },
        { text: "ORDINAL", value: 2 },
        { text: "ORG", value: 3 },
        { text: "TIME", value: 1 },
      ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.text);
    axios
      .post("/data", {
        text: this.state.text,
      })
      .then((res) => {
        console.log(res.data.count);
        const output = [];
        for (const item in res.data.count) {
          output.push({ text: item, value: res.data.count[item] });
        }
        this.setState({ apiOutput: output });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Container className="themed-container" fluid={true}>
          <Row>
            <Col
              xs="4"
              className="border shadow p-5"
              style={{ backgroundColor: "#563d7c", borderRadius: "10px" }}
            >
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                      color: "white",
                    }}
                  >
                    Add text below
                  </Label>
                  <Input
                    className="input-text"
                    style={{ height: "300px", color: "black" }}
                    type="textarea"
                    placeholder="Add text here"
                    value={this.state.text}
                    onChange={(e) => this.setState({ text: e.target.value })}
                  ></Input>
                </FormGroup>
                <Button
                  type="submit"
                  style={{
                    display: "block",
                    marginTop: "30px",
                    marginBottom: "50px",
                    color: "white",
                    backgroundColor: "#637C3D",
                  }}
                >
                  Get Named Entity Types
                </Button>
                <p style={{ color: "white" }}>
                  This app uses <a href="https://spacy.io/">spaCy</a> named
                  entity recognition. Entity types defined{" "}
                  <a href="https://spacy.io/api/annotation#named-entities">
                    here
                  </a>
                  .
                </p>
              </Form>
            </Col>
            <Col xs="8">
              <div style={{ margin: "30px 50px" }}>
                <ReactWordcloud
                  words={this.state.apiOutput}
                  options={{ fontSizes: [40, 300] }}
                  size={[800, 500]}
                  style={{ margin: "auto" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
