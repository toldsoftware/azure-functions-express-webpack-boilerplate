# Boilerplate for ReactXP App

Based on ReactXP Hello World Sample. 

## Improvments

- Improved Build (Webpack)
    - Split Vendor Code (Reload changes quicker)
    - Browser Sync (Browser Testing)
    - Preact (Tiny Build Size)
    - Bundle Visualizer (Visualize Bundle Library Size)

## How To

- View Visualizer
    - Enable in webpack
        - `const enableBundleVisualizer = false;`
    - Run webpack
        - `webpack`

- Run in Browser with Live Reload
    - `webpack -w`

- Change Sample App 
    - Modify the path in `index.tsx`
    - Restart webpack


## Note for Native

Android and iOS Folders should be added from ReactXP Sample App to target native. 

These have been excluded for now for simplicity.