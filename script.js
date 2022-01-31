function initialize()
{
  inputContainer = document.getElementById("inputform");
  meanOutput = document.getElementById("meanRes");
  medianOutput = document.getElementById("medianRes");
  modeOutput = document.getElementById("modeRes");
  diceTable = document.getElementById("dicetable");
  oneOutput = document.getElementById("fOne");
  twoOutput = document.getElementById("fTwo");
  threeOutput = document.getElementById("fThree");
  fourOutput  = document.getElementById("fFour");
  fiveOutput = document.getElementById("fFive");
  sixOutput = document.getElementById("fSix");
  doubleOutput = document.getElementById("doubles");
  tripleOutput = document.getElementById("triples");
  check = document.getElementById("cor");
  //Initialize everything need for body /\
  //Everything needed for code \/
  numRoll=0;
  numDice=0;
  dice=0;
  modeArray=[];
  modeAmount=0;
  total=0;
  totalRoll=0;
  dice1=0;
  dice2=0;
  dice3=0;
  freqTwo=0;
  freqThree=0;
  diceArray=[];
  amount=0;
}

function rollDice()
{
  totalRoll=numRoll*numDice;
  for (var i=0; i<numRoll;i++)
  {
    var newRow=diceTable.insertRow();
    var newCell=newRow.insertCell();
    newCell.innerHTML="Roll "+(i+1);
    //Inner code for multiple dice
    for(var j=0;j<numDice;j++)
    {
      dice=Math.floor(Math.random()*6)+1;
      newCell=newRow.insertCell();
      newCell.innerHTML=dice;
      total+=dice;
      diceArray.push(dice);
      if(j==0)
      {
        dice1=dice;
      }
      if(j==1)
      {
        dice2=dice;
      }
      if(j==2)
      {
        dice3=dice;
      }
      if(numDice>1&&j==numDice-1)
      {
        compareDice();
      }
    }
  }
  //Get data from each function
  getMean(total,totalRoll);
  getMedian();
  oneOutput.innerHTML=getFrequency(1);
  twoOutput.innerHTML=getFrequency(2);
  threeOutput.innerHTML=getFrequency(3);
  fourOutput.innerHTML=getFrequency(4);
  fiveOutput.innerHTML=getFrequency(5);
  sixOutput.innerHTML=getFrequency(6);
  getMode();
  doubleOutput.innerHTML=freqTwo;
  tripleOutput.innerHTML=freqThree;
}

function getMean(sum,amount)
{
  mean=(sum/amount).toFixed(2);
  meanOutput.innerHTML=mean;
}

function getMedian()
{
  halfWay=0;
  diceArray.sort(function(a, b){return a - b});
  if(totalRoll%2==1)
  {
    if(totalRoll!=1)
    {
      totalRoll-=1;
      halfWay=totalRoll/2;
      median=diceArray[halfWay];
      medianOutput.innerHTML=median;
    }
    else if (totalRoll==1)
    {
      median=diceArray[0];
      medianOutput.innerHTML=median;
    }
  }
  else if(totalRoll%2==0)
  {
    halfWay=totalRoll/2;
    median=((diceArray[halfWay]+diceArray[halfWay-1])/2);
    medianOutput.innerHTML=median;
  }
}

function getMode()
{
  //Count the highest amount
  for(let i=1;i<=6;i++)
  {
    if(getFrequency(i)>modeAmount)
    {
      modeAmount=getFrequency(i);
    }
  }
  //Match the numbers
  for(let i=1;i<=6;i++)
  {
    if(getFrequency(i)==modeAmount)
    {
      modeArray.push(i);
    }
  }
   modeOutput.innerHTML=modeArray;
}

function getFrequency(num)
{
  score=0;
  for(var i=0;i<=totalRoll;i++)
  {
    if(num==diceArray[i])
    {
      score++;
    }
  }
  return score;
}

function compareDice()
{
  //For getting the frequency of doubles and triples
  if(numDice==2)
  {
    if(dice1==dice2)
    {
      freqTwo++;
    }
  }
  if(numDice==3)
  {
    if(dice1==dice2||dice2==dice3||dice1==dice3)
    {
      freqTwo++;
    }
    if(dice1==dice2&&dice2==dice3&&dice1==dice3)
    {
      freqThree++;
    }
  }
}

function getData()
{
  if(amount==0)
  {
   numRoll=inputContainer.rollN.value;
    numDice=inputContainer.diceA.value;
    if((numRoll>1 || numRoll==1)&& numDice>=1 && numDice<=3)
    {
      rollDice();
    }
    else
    {
      check.innerHTML="Please change your parameters.";
    }
  } else {
    check.innerHTML="Please clear exisiting data first."
  }
  amount++;
}

function clearTable()
{
  for(var i=1;i<diceTable.rows.length;i++)
  {
    diceTable.deleteRow(i);
    i--;
  }
  initialize();
  meanOutput.innerHTML="";
  medianOutput.innerHTML="";
  modeOutput.innerHTML="";
  oneOutput.innerHTML="";
  twoOutput.innerHTML="";
  threeOutput.innerHTML="";
  fourOutput.innerHTML="";
  fiveOutput.innerHTML="";
  sixOutput.innerHTML="";
  doubleOutput.innerHTML="";
  tripleOutput.innerHTML="";
  check.innerHTML="";
  amount=0;
}