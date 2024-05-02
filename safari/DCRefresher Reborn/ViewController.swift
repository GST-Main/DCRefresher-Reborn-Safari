import Cocoa
import SafariServices
import WebKit

let EXTENSION_BUNDLE_IDENTIFIER = "com.GST.DCRefresher-Reborn.Extension"

class ViewController: NSViewController {
    var button: NSButton!

    override func viewDidLoad() {
        super.viewDidLoad()
                
        let button = NSButton(title: "확장프로그램 설정", target: self, action: #selector(showPreferenceForExtension))
        button.controlSize = .large
        button.bezelColor = .controlAccentColor
        button.isHighlighted = true
        let logo = NSImage(named: "Icon") ?? NSImage()
        let imageView = NSImageView(image: logo)
        let welcomeText = NSTextField()
        welcomeText.stringValue = "DCRefresher Safari 설치가 완료됐습니다\nSafari 설정에서 확장프로그램을 활성화 시켜주세요\n원활한 사용을 위해 사이트 접근 권한을 허용해주세요\n"
        welcomeText.alignment = .center
        welcomeText.isEditable = false
        welcomeText.isBezeled = false
        welcomeText.drawsBackground = false
        
        self.view.addSubview(button)
        self.view.addSubview(imageView)
        self.view.addSubview(welcomeText)
        
        self.view.translatesAutoresizingMaskIntoConstraints = false
        button.translatesAutoresizingMaskIntoConstraints = false
        imageView.translatesAutoresizingMaskIntoConstraints = false
        welcomeText.translatesAutoresizingMaskIntoConstraints = false
        
        self.view.widthAnchor.constraint(equalToConstant: 330).isActive = true
        self.view.heightAnchor.constraint(equalToConstant: 320).isActive = true
        
        button.centerXAnchor.constraint(equalTo: self.view.centerXAnchor).isActive = true
        imageView.centerXAnchor.constraint(equalTo: self.view.centerXAnchor).isActive = true
        welcomeText.centerXAnchor.constraint(equalTo: self.view.centerXAnchor).isActive = true
        
        imageView.widthAnchor.constraint(equalToConstant: 128).isActive = true
        imageView.heightAnchor.constraint(equalToConstant: 128).isActive = true
        
        imageView.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 30).isActive = true
        welcomeText.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 20).isActive = true
        button.bottomAnchor.constraint(equalTo: self.view.bottomAnchor, constant: -30).isActive = true
    }

    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }
    
    @objc
    func showPreferenceForExtension() {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: EXTENSION_BUNDLE_IDENTIFIER) { error in
            DispatchQueue.main.async {
                NSApplication.shared.terminate(nil)
            }
        }
    }
}

