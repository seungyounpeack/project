package kr.go.guri.manager.userAuth.menuAuthMng.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 관리자 > 메뉴 권한 조회 Service 클래스
 * @author 김부권
 * @since 2022. 06. 22.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *     수정일                         수정자                            수정내용
 *  -----------       -------------   ----------------------
 *  2022.06.22.           김부권                          최초 생성
 *   
 * </pre>
 */


public interface MenuAuthMngService {

	/**
	 * 권한 코드별  목록 조회하기 
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectAuthList(Map<String, Object> param) throws SQLException , IOException;
	
	
	/**
	 * 권한 코드별 선택한 메뉴 목록 조회하기 
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectAuthMenuList(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 권한 코드에 대한 메뉴 리스트 체크
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectCheckMenuAuth(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 권한별 메뉴 저장
	 * @return
	 * @throws SQLException , IOException
	 */
	int insertAuthMenuInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 권한별 메뉴 삭제
	 * @return
	 * @throws SQLException , IOException
	 */
	int deleteAuthMenuInfo(Map<String, Object> param) throws SQLException , IOException;
	
}
