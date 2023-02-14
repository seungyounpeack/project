package kr.go.guri.cmm.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashPassword {
	
	/*********
	 * SHA-256 으로 해싱하는 메소드
	 * @param msg
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	public String toSha256(String msg) throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		md.update((msg+"%ez)20$10~").getBytes());
		
		return bytesToHex(md.digest());
	}
	
	public String bytesToHex(byte[] bytes) {
		StringBuilder sb = new StringBuilder();
		for(byte b : bytes) {
			sb.append(String.format("%02x", b));
		}
		return sb.toString();
	}
}
