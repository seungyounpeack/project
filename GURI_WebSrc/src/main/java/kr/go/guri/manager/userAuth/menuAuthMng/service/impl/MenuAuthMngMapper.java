package kr.go.guri.manager.userAuth.menuAuthMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;
/**
 * 메뉴 권한 조회 Controller 클래스
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
@Repository("menuAuthMngMapper")
public class MenuAuthMngMapper extends ComAbstractDAO  {
	
	/**
	 * 권한 조회	
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	public List<Map<String, Object>> selectAuthList(Map<String, Object> param) throws SQLException , IOException {
		return selectList("MenuAuthMng.selectAuthList", param);
	}
	
	
	/**
	 * 권한 코드별 선택한 메뉴 목록 조회하기 
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	public List<Map<String, Object>> selectAuthMenuList(Map<String, Object> param) throws SQLException , IOException {
		return selectList("MenuAuthMng.selectAuthMenuList", param);
	}
	
	/**
	 * 권한 코드별 메뉴 구하기 
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	public List<Map<String, Object>> selectCheckMenuAuth(Map<String, Object> param) throws SQLException , IOException {
		return selectList("MenuAuthMng.selectCheckMenuAuth", param);
	}
	
	/**
	 * 권한별 메뉴 저장
	 * **/
	public int insertAuthMenuInfo(Map<String, Object> param) throws SQLException , IOException {
		return insert("MenuAuthMng.insertAuthMenuInfo", param);
	}
	
	/**
	 * 권한별 메뉴 삭제
	 * **/
	public int deleteAuthMenuInfo(Map<String, Object> param) throws SQLException , IOException {
		return delete("MenuAuthMng.deleteAuthMenuInfo", param);
	}
	
}
