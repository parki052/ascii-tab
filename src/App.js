import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState, useRef } from 'react';
import MyAppBar from './Components/MyAppBar/MyAppBar';
import MyDrawer from './Components/MyDrawer/MyDrawer';
import TabEditor from './Components/TabEditor/TabEditor';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const initialState = {
    tabGrid : [
    "E||--------------------------------|",
    "B||--------------------------------|",
    "G||--------------------------------|",
    "D||--------------------------------|",
    "A||--------------------------------|",
    "E||--------------------------------|",
  ],

  }

  let tabGridInitialState = [
    "E||--------------------------------|",
    "B||--------------------------------|",
    "G||--------------------------------|",
    "D||--------------------------------|",
    "A||--------------------------------|",
    "E||--------------------------------|",
  ];

  /*todo- put initial state values into an init object,
          feed init state into prop initializers,
          implement reset feature which resets init values from init object
  */

  const [cursorPos, setCursorPos] = useState({ x: 3, y: 0 });
  const [tabGrid, setTabGrid] = useState(initialState.tabGrid);
  const [currentTabRow, setcurrentTabRow] = useState(0);
  const [tabTitle, setTabTitle] = useState("Untitled Tab");
  const [editingTitle, setEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [isLightMode, setIsLightMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  const fileRef = useRef();

  const drawerWidth = 160;
  const appBarHeight = 75;

  const handleUploadClick = (e) => {
    const [file] = e.target.files;

    let promise = new Promise(function (resolve) {
      let reader = new FileReader();
      let upload = [];

      reader.onload = function () {
        let lines = reader.result.split('\n');
        for (var line = 0; line < lines.length; line++) {
          upload = [...upload, ...(lines[line].split(" "))];
        }
        upload.pop();
        resolve(handleFinishedUpload(upload));
      }

      reader.readAsText(file);
      let title = file.name;
      let trimmed = title.replace(".txt", "");
      setTabTitle(trimmed);
    });
    promise.then();
  }
  const handleFinishedUpload = (upload) => {
    setTabGrid(upload);
    setCursorPos({ x: 3, y: 3 })
  }

  const handleEditingTitle = () => {
    setEditTitle(tabTitle);
    setEditingTitle(true);
  }

  const handleSaveNewTitle = (e) => {
    setTabTitle(editTitle);
    setEditingTitle(false);
  }

  const handleTitleChange = (e) => {
    setEditTitle(e.target.value);
  }

  const handleLightModeClick = () => {
    let toggled = !isLightMode;
    setIsLightMode(toggled);

    let theme = isLightMode
      ? darkTheme
      : lightTheme;

    setCurrentTheme(theme);
  }

  useEffect(() => {
    document.title = "ascii tab";
    const onKeyDown = ({ key }) => {
      console.log(key);
      if (key === "ArrowLeft") {
        if (cursorPos.x > 3) {
          setCursorPos(prev => ({
            ...prev,
            x: prev.x - 1
          }));
        }
      }
      if (key === "ArrowRight") {
        if (cursorPos.x === tabGrid[cursorPos.y].length - 1) {
          let newTabGrid = tabGrid.map((row, index) => {
            return row + "-";
          })
          setTabGrid(newTabGrid);
        }
        setCursorPos(prev => ({
          ...prev,
          x: prev.x + 1
        }));
      }
      if (key === "ArrowUp") {
        if (cursorPos.y > 0) {
          setCursorPos(prev => ({
            ...prev,
            y: prev.y - 1
          }));
        }
      }
      if (key === "ArrowDown") {
        if (cursorPos.y < 5) {
          setCursorPos(prev => ({
            ...prev,
            y: prev.y + 1
          }));
        }
      }
      if (!isNaN(parseInt(key))) {
        let newTabGrid = tabGrid.map((row, index) => {
          let newRow = row;
          if (index === cursorPos.y) {
            newRow = newRow.substring(0, cursorPos.x) + key + newRow.substring(cursorPos.x + 1);
          }
          return newRow;
        });

        setTabGrid(newTabGrid);
      }
      if (key === "Delete") {
        let currentChar = tabGrid[cursorPos.y][cursorPos.x];
        if (currentChar !== "-" && currentChar !== "|") {
          console.log(tabGrid[cursorPos.y][cursorPos.x])
          let newTabGrid = tabGrid.map((row, index) => {
            let newRow = row;
            if (index === cursorPos.y) {
              newRow = newRow.substring(0, cursorPos.x) + "-" + newRow.substring(cursorPos.x + 1);
            }
            return newRow;
          });

          setTabGrid(newTabGrid);
        }
        else {
          if ((isCurrentColUniform(tabGrid, cursorPos.x, "-") || isCurrentColUniform(tabGrid, cursorPos.x, "|")) && tabGrid[0].length > 4) {
            console.log("on an column of - or | and enough empty cols to delete");

            let newTabGrid = tabGrid.map((row, index) => {
              let newRow = row.substring(0, cursorPos.x) + row.substring(cursorPos.x + 1);
              return newRow;
            });

            setTabGrid(newTabGrid);
            if (cursorPos.x > 3) {
              setCursorPos(prev => ({
                ...prev,
                x: prev.x - 1
              }));
            }

          }
        }
      }
      if (key === "|") {
        let newTabGrid = tabGrid.map((row, index) => {
          let newRow = row.substring(0, cursorPos.x) + "|" + row.substring(cursorPos.x);
          return newRow;
        });

        setTabGrid(newTabGrid);
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  });

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <MyAppBar isLightMode={isLightMode} handleLightModeClick={handleLightModeClick} />
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <MyDrawer
          saveToText={(e) => saveToText(tabGrid, tabTitle, e)}
          drawerWidth={drawerWidth}
          fileRef={fileRef} />
        <div tabIndex="0" className="App">
          <input
            ref={fileRef}
            onChange={handleUploadClick}
            multiple={false}
            type="file"
            hidden
          >
          </input>
        </div>
        <div style={{ flexGrow: 1}}>
          <div style={{ height: appBarHeight, paddingLeft: drawerWidth}} />
          <TabEditor
            editingTitle={editingTitle}
            tabTitle={tabTitle}
            handleTitleChange={handleTitleChange}
            handleEditingTitle={handleEditingTitle}
            handleSaveNewTitle={handleSaveNewTitle}
            getAscii={() => getAscii(cursorPos, tabGrid)}/>
        </div>
      </Box>
    </ThemeProvider>
  );
}
function isCurrentColUniform(tabGrid, cursorX, char) {
  let column = [
    tabGrid[0][cursorX] === char,
    tabGrid[1][cursorX] === char,
    tabGrid[2][cursorX] === char,
    tabGrid[3][cursorX] === char,
    tabGrid[4][cursorX] === char,
    tabGrid[5][cursorX] === char
  ];
  if (column.find(x => x === false) === undefined) {
    return true
  }
  else return false;
}
function getAscii(cursorPos, tabGrid) {
  let rows = [];

  tabGrid.forEach((row, index) => {
    if (index === cursorPos.y) {
      let preCursor =
        cursorPos.x === 0
          ? ""
          : row.slice(0, cursorPos.x);

      let cursorChar = row[cursorPos.x];
      let postCursor = row.slice(cursorPos.x + 1);

      rows.push(
        <code key={index}>
          {preCursor}
          <mark>
            {cursorChar}
          </mark>
          {postCursor + "\n"}
        </code>
      )
    }
    else {
      rows.push(
        <code key={index}>
          {row + "\n"}
        </code>
      )
    }
  });

  return (
    <pre>
      {rows}
    </pre>
  );
}
const saveToText = (tabGrid, title) => {
  const element = document.createElement("a");
  const file = new Blob([saveTabGridToFile(tabGrid)], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = title + ".txt";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}
function saveTabGridToFile(tabGrid) {
  let saveString = "";

  tabGrid.forEach((row, index) => {
    saveString += row + "\n"
  });

  return saveString;
}
export default App;
