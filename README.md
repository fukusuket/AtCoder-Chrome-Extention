# AtCoder-Chrome-Extention

## About
This extention creates python units and copy clibord when loading the Atcoder page.


## Install

1. git clone https://github.com/fukusuket/AtCoder-Chrome-Extention.git
2. [Follow the developer's guide](https://developer.chrome.com/docs/extensions/mv2/getstarted/), the steps below to install
   1. Open the Extension Management page by navigating to chrome://extensions
   2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
   3. Click the LOAD UNPACKED button and select the 1 directory.

## How to use
No action needed. 
Automatically copies the Python unit test code to the clipboard when the AtCoder Tasks page loads.


## Input
Loding AtCoder problem page.

## Output
For example, if you load [ABC 139 B problem](https://atcoder.jp/contests/abc139/tasks/abc139_b),
then following unit tests are copeid to clibord.
```
    def test_入力例_1(self):
        ans = func([4 10])
        res = [3]
        self.assertEqual(res, ans)
      
    def test_入力例_2(self):
        ans = func([8 9])
        res = [2]
        self.assertEqual(res, ans)
      
    def test_入力例_3(self):
        ans = func([8 8])
        res = [1]
        self.assertEqual(res, ans)
  
```

## Acknowledgments
This tool is based on the following tools.
- [ac-unit-test](https://github.com/YujiSoftware/ac-unit-test) by @YujiSoftware