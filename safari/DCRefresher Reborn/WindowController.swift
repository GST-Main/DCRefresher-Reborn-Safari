import Cocoa

class WindowContorller: NSWindowController {
    override func windowDidLoad() {
        super.windowDidLoad()
        
        let appName = Bundle.main.infoDictionary?["CFBundleName"] as? String ?? "DCRefresher Safari"
        self.window?.title = appName
    }
}
