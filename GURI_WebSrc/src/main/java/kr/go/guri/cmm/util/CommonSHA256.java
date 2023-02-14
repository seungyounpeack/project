package kr.go.guri.cmm.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
/**
 * SHA256 적용
 * @author 김부권
 * @since 2021. 10. 07.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *     수정일			         수정자				수정내용
 *  -------------    -------------   ----------------------
 *  2021. 10. 07.	        김 부 권              최초생성
 *   
 * </pre>
 */
public class CommonSHA256 {
	public static String encrypt(String text) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(text.getBytes());

        return bytesToHex(md.digest());
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }
}
