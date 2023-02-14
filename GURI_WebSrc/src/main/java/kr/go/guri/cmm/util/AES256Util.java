package kr.go.guri.cmm.util;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;

public class AES256Util {
	private String iv;
	private Key keySpec;

	/**
	 * 16자리의 키값을 입력하여 객체를 생성
	 * 
	 * @param key 암/복호화를 위한 키값         
	 * @throws UnsupportedEncodingException 키값의 길이가 16이하일 경우 발생
	 */
	String scuty = GlobalProperties.getProperty("Globals.scuty.enck");

	public AES256Util() throws UnsupportedEncodingException {
		this.iv = scuty.substring(0, 16);
		byte[] keyBytes = new byte[16];
		byte[] b = scuty.getBytes("UTF-8");
		int len = b.length;
		if (len > keyBytes.length) {
			len = keyBytes.length;
		}
		System.arraycopy(b, 0, keyBytes, 0, len);
		SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");

		this.keySpec = keySpec;
	}

	/**
	 * AES256 으로 암호화
	 * 
	 * @param str 암호화할 문자열   
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws GeneralSecurityException
	 * @throws UnsupportedEncodingException
	 */
	public String encrypt(String str) throws NoSuchAlgorithmException,
			GeneralSecurityException, UnsupportedEncodingException {
		Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
		c.init(Cipher.ENCRYPT_MODE, keySpec,  new IvParameterSpec(iv.getBytes()));
		byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));
//		String enStr = Base64.getEncoder().encodeToString(encrypted);
		String enStr = Hex.encodeHexString(encrypted);
		return enStr;
	}

	/**
	 * AES256으로 암호화된 txt를 복호화
	 * 
	 * @param str 복호화할 문자열    
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws GeneralSecurityException
	 * @throws UnsupportedEncodingException
	 * @throws DecoderException 
	 */
	public String decrypt(String str) throws NoSuchAlgorithmException,
			GeneralSecurityException, UnsupportedEncodingException, DecoderException {
		Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
		c.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));
//		byte[] byteStr = str.getBytes();
		byte[] byteStr = Hex.decodeHex(str.toCharArray());
		return new String(c.doFinal(byteStr), "UTF-8");
	}
}
