package kr.go.guri.manager.userAuth.userAuthMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;
/**
 * 관리자 권한 설정 Mapper 클래스
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
@Repository("userAuthMngMapper")
public class UserAuthMngMapper extends ComAbstractDAO  {
	
	/**
	 * 유저 목록 조회하기
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	public List<Map<String, Object>> selectUserList(Map<String, Object> param) throws SQLException , IOException {
		return selectList("UserAuthMng.selectUserList", param);
	}
	
	/**
	 * 부서별 권한 목록 가져오기
	 * **/
	public List<Map<String, Object>> selectUserRoleList(Map<String, Object> param) throws SQLException , IOException {
		return selectList("UserAuthMng.selectUserRoleList", param);
	}
	
	
	/**
	 * 직급 목록 가져오기
	 * **/
	public List<Map<String, Object>> selectPosList() throws SQLException , IOException {
		return selectList("UserAuthMng.selectPosList");
	}
	
	/**
	 * 상위부서 목록 가져오기
	 * **/
	public List<Map<String, Object>> selectUpperDetpList() throws SQLException , IOException {
		return selectList("UserAuthMng.selectUpperDetpList");
	}
	
	
	/**
	 * 하위부서 목록 가져오기
	 * **/
	public List<Map<String, Object>> selectSectionDeptList(Map<String, Object> param) throws SQLException , IOException {
		return selectList("UserAuthMng.selectSectionDeptList", param);
	}
	
	/**
	 * 유저 설정 권한 정보 저장하기
	 * **/
	public int selectUserRoleInfo(Map<String, Object> param) throws SQLException , IOException {
		return selectOne("UserAuthMng.selectUserRoleInfo", param);
	}
	
	/**
	 * 유저 설정 권한 정보 저장하기
	 * **/
	public int insertUserRoleInfo(Map<String, Object> param) throws SQLException , IOException {
		return insert("UserAuthMng.insertUserRoleInfo", param);
	}
	
	/**
	 *  유저 설정 정보 삭제하기
	 * **/
	public int deleteUserRoleInfo(Map<String, Object> param) throws SQLException , IOException {
		return delete("UserAuthMng.deleteUserRoleInfo", param);
	}
}
