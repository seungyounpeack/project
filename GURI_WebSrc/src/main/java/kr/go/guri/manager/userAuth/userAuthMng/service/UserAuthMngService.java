package kr.go.guri.manager.userAuth.userAuthMng.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 관리자 > 사용자 권한 설정 Service 클래스
 * @author 김부권
 * @since 2022. 06. 28.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *     수정일                         수정자                            수정내용
 *  -----------       -------------   ----------------------
 *  2022.06.28.           김부권                          최초 생성
 *   
 * </pre>
 */


public interface UserAuthMngService {

	/**
	 * 유저 목록 조회하기
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectUserList(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 부서별 권한 목록 가져오기
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectUserRoleList(Map<String, Object> param) throws SQLException , IOException;

	/**
	 * 직급 목록 가져오기
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectPosList() throws SQLException , IOException;
	
	/**
	 * 상위부서 목록 가져오기
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectUpperDetpList() throws SQLException , IOException;
	
	/**
	 * 하위부서 목록 가져오기
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectSectionDeptList(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 유저 설정 권한 정보 저장하기
	 * @return
	 * @throws SQLException , IOException
	 */
	int selectUserRoleInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 유저 설정 권한 정보 저장하기
	 * @return
	 * @throws SQLException , IOException
	 */
	int insertUserRoleInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 유저 설정 정보 삭제하기
	 * @return
	 * @throws SQLException , IOException
	 */
	int deleteUserRoleInfo(Map<String, Object> param) throws SQLException , IOException;
	
}
