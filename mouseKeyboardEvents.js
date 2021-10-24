function moveKeys() // if the arrow keys are pressed, the selected charge moves
{
  charges.forEach(charge => {
    if (charge.selected) 
    {
      if (canvas.keyIsDown(canvas.RIGHT_ARROW))
      {
          charge.position.x += 3;
      }
      if (canvas.keyIsDown(canvas.LEFT_ARROW))
      {
          charge.position.x -= 3;
      }
      if (canvas.keyIsDown(canvas.DOWN_ARROW))
      {
          charge.position.y += 3;
      }
      if (canvas.keyIsDown(canvas.UP_ARROW))
      {
          charge.position.y -= 3;
      }  
    }
  })
}




function whenMouseClicked() // this is an inbuilt p5 function that runs everytime any mouse button is clicked
{  
  buttons.forEach(button => { // this will loop through all the buttons
    if (button.visible) 
    {
      if (pointIsInsideRect(mousePosition, button)) // if the point where the user clicks is inside the button
      {
        button.clicked();
      }
    }
  })

  checkBoxes.forEach(checkBox => { // these will loop through all the checkBoxes
    if (checkBox.visible) 
    {
      if (pointIsInsideRect(mousePosition, checkBox)) // if the point where the user clicks is inside the checkbox
      {
        checkBox.clicked();
      }
    }
  })

  if (showContextMenu) 
  {
    contextMenuButtons.forEach(button => { // this will loop through all the buttons
      if (button.visible) 
      {
        if (pointIsInsideRect(mousePosition, button)) // if the point where the user clicks is inside the button
        {
          button.clicked();
        }
      }
    })
  }

  
  if (showEquipotentialLines && mousePosition.x < innerWidth - sidePanelWidth)
  {
    let mouseClickPosition = new p5.Vector(mousePosition.x, mousePosition.y); 
    createEquipotentialLine(mouseClickPosition);
  }

  if (testChargeMode) // if test charge mode is on, this will create a test charge wherever the user clicks 
  {
    testCharges.push(new TestCharge(mousePosition, testChargeCharge));
  }

  



  charges.forEach(charge => {charge.dragging = false; charge.selected = false;} )

  let selectedCharge = charges.find(charge => pointIsInsideCircle(mousePosition, charge))
  if (selectedCharge != undefined) 
  {
    selectedCharge.selected = true;
  }

  hideContextMenu();
}





function whenMouseMoved() 
{
  buttons.forEach(button => { // this will loop through all the buttons
    if (button.visible) 
    {
      button.hovering = false;
      if (pointIsInsideRect(mousePosition, button)) // if the mouse position is over a button
      {
        button.hovering = true;
      }
    }
  })

  
  checkBoxes.forEach(checkBox => { // this will loop through all the checkBoxes
    if (checkBox.visible) 
    {
      checkBox.hovering = false;
      if (pointIsInsideRect(mousePosition, checkBox)) // if the mouse position is over a checkBox
      {
        checkBox.hovering = true;
      }
    }
  })

  if (showContextMenu) 
  {
    contextMenuButtons.forEach(button => { // this will loop through all the context Menu Buttons
      if (button.visible) 
      {
        button.hovering = false;
        if (pointIsInsideRect(mousePosition, button))
        {
          button.hovering = true;
        }
      }
    })
  }
}
























function whenDoubleClicked()
{
  
}



function whenKeyPressed()
{
 
}