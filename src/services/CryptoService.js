// import ed2curve from 'ed2curve'
import { encodeBase64, decodeUTF8, decodeBase64, encodeUTF8 } from 'tweetnacl-util'

const sodium = require('libsodium-wrappers')
const bip39 = require('bip39')

export default ({
  validateSignature (message, signature, publicKey) {
    return new Promise(async (resolve, reject) => {
      publicKey = decodeBase64(publicKey)
      signature = decodeBase64(signature)
      resolve(sodium.crypto_sign_open(signature, publicKey))
    })
  },
  decrypt (message, nonce, privateKey, pubkey) {
    return new Promise(async (resolve, reject) => {
      message = decodeBase64(message)
      privateKey = sodium.crypto_sign_ed25519_sk_to_curve25519(decodeBase64(privateKey))
      pubkey = sodium.crypto_sign_ed25519_pk_to_curve25519(decodeBase64(pubkey))
      nonce = decodeBase64(nonce)
      var decrypted = sodium.crypto_box_open_easy(message, nonce, pubkey, privateKey)
      decrypted = encodeUTF8(decrypted)
      resolve(decrypted)
    })
  },
  encrypt (message, privateKey, pubkey) {
    return new Promise(async (resolve, reject) => {
      message = new TextEncoder().encode(message)
      privateKey = sodium.crypto_sign_ed25519_sk_to_curve25519(decodeBase64(privateKey))
      pubkey = sodium.crypto_sign_ed25519_pk_to_curve25519(decodeBase64(pubkey))

      var nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES)
      var encrypted = sodium.crypto_box_easy(message, nonce, pubkey, privateKey)
      resolve({
        encrypted: encodeBase64(encrypted),
        nonce: encodeBase64(nonce)
      })
    })
  },
  generateKeys (phrase) {
    return new Promise(async (resolve, reject) => {
      if (!phrase) phrase = bip39.entropyToMnemonic(sodium.randombytes_buf(sodium.crypto_box_SEEDBYTES / 2))
      var ken = new TextEncoder().encode(bip39.mnemonicToEntropy(phrase))
      var keys = sodium.crypto_sign_seed_keypair(ken)
      resolve({
        phrase,
        privateKey: encodeBase64(keys.privateKey),
        publicKey: encodeBase64(keys.publicKey)
      })
    })
  },
  getEdPkInCurve (pubkey) {
    return encodeBase64(sodium.crypto_sign_ed25519_pk_to_curve25519(decodeBase64(pubkey)))
  }
})
