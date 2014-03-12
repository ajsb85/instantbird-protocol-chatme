let {interfaces: Ci, utils: Cu} = Components;

Cu.import("resource:///modules/imXPCOMUtils.jsm");
Cu.import("resource:///modules/jsProtoHelper.jsm");
Cu.import("resource:///modules/xmpp.jsm");
Cu.import("resource:///modules/xmpp-session.jsm");

function ChatMeAccount(aProtoInstance, aImAccount) {
  this._init(aProtoInstance, aImAccount);
}
//chatme.im
//chatme.biz
//dotchat.me
//xmpp.guru
//xmpp.technology

/* 
Welcome on ChatMe, “a free social network”.

Login to your existing XMPP account or create a new one for free!

For your account safety, when you login or register, make sure your password remains secret.

https://webchat.chatme.im/

Register a new XMPP account to join your friends on your own social cloud. That's simple!

By using our service, you accept our terms of use.
http://chatme.im/informazioni-legali/

Required Address@Password
Code (capcha)

Advanced:
Resource
Priority
--
Enter the groupchat you want to join and the nick you want to have. You can also go back to the login page.

By using our service, you accept our terms of use.
*/

ChatMeAccount.prototype = {
  __proto__: XMPPAccountPrototype,
  get canJoinChat() false,
  connect: function() {
    this._jid = this._parseJID(this.name.replace("@","\\40") + "@chatme.im/instantbird");
    this._connection = new XMPPSession("chatme.com", 5222,
                                       "allow_unencrypted_plain_auth", this._jid,
                                       this.imAccount.password, this);
  }
};

//XMPPSession(aHost, aPort, aSecurity, aJID, aPassword, aAccount)

function ChatMeProtocol() { }

ChatMeProtocol.prototype = {
  __proto__: GenericProtocolPrototype,
  get normalizedName() "chatme",
  get name() "ChatMe",
  get iconBaseURI() "chrome://prpl-chatme/skin/",
  getAccount: function(aImAccount) new ChatMeAccount(this, aImAccount),
  classID: Components.ID("{4a41d120-a9bc-11e3-a5e2-0800200c9a66}")
};

const NSGetFactory = XPCOMUtils.generateNSGetFactory([ChatMeProtocol]);
